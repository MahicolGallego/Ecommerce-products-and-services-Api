import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { ErrorManager } from 'src/common/exception-filters/error-manager.filter';
import { validatePassword } from 'src/common/helpers/validate-password.helper';
import { JwtService } from '@nestjs/jwt';
import { IPayloadToken } from 'src/common/interfaces/auth/payload-token.interface';
import { plainToClass } from 'class-transformer';
import { ILoginResponse } from 'src/common/interfaces/auth/login-response.interface';
import { DataSource } from 'typeorm';
import { hashPassword } from 'src/common/helpers/hash-password.helper';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly dataSource: DataSource,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(createUserDto);
  }

  async validateUser(userCredentials: {
    email: string;
    password: string;
  }): Promise<User> {
    try {
      const foundUser = await this.usersService.findByEmail(
        userCredentials.email.toLowerCase().trim(),
      );

      if (!foundUser)
        throw new ErrorManager({
          type: 'UNAUTHORIZED',
          message: 'Invalid credentials',
        });

      // validate password
      await validatePassword(foundUser.password, userCredentials.password);

      return foundUser;
    } catch (error) {
      console.error(error);
      throw error instanceof Error
        ? ErrorManager.createErrorSignature(error.message)
        : ErrorManager.createErrorSignature('An unexpected error occurred');
    }
  }

  generateJwtToken(user: User): ILoginResponse {
    try {
      const payload: IPayloadToken = {
        sub: user.id,
        role: user.role,
      };

      const userToResponse = plainToClass(User, user);

      return {
        access_token: this.jwtService.sign(payload),
        user: userToResponse,
      };
    } catch (error) {
      console.error(error);
      throw error instanceof Error
        ? ErrorManager.createErrorSignature(error.message)
        : ErrorManager.createErrorSignature('An unexpected error occurred');
    }
  }

  async sendPasswordRecoveryEmail(email: string): Promise<{ message: string }> {
    try {
      email = email.toLowerCase().trim();
      const user = await this.usersService.findByEmail(email);

      if (!user)
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'User not found',
        });

      let token: string;
      let verifyExistingUser: User | false;

      do {
        token = crypto.randomBytes(32).toString('hex');
        verifyExistingUser =
          await this.usersService.findByPasswordResetToken(token);
      } while (verifyExistingUser);

      await this.usersService.savePasswordResetToken(user.id, token);

      const emailMessage = /*html*/ `
      <h1>Password Reset Request</h1>
      <p>You recently requested to reset your password for your account.</p>
      <p>To reset your password, please click the following link:</p>
      <a href='http://localhost:3000/api/v1/auth/reset-password/${token}' target='_blank'>Reset My Password</a>`;

      await this.emailService.sendEmail(
        'Password Reset Request',
        emailMessage,
        user.name,
        email,
      );

      return { message: 'Password recovery email sent successfully' };
    } catch (error) {
      console.error(error);
      throw error instanceof Error
        ? ErrorManager.createErrorSignature(error.message)
        : ErrorManager.createErrorSignature('An unexpected error occurred');
    }
  }

  async verifyPasswordResetToken(token: string): Promise<{ message: string }> {
    const user = await this.usersService.findByPasswordResetToken(token);

    if (!user)
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'Invalid or expired token',
      });

    return {
      message:
        'Token to reset password is valid. You can now reset your password',
    };
  }

  async resetPassword(
    token: string,
    password: string,
  ): Promise<{ message: string }> {
    const userPromise = await this.usersService.findByPasswordResetToken(token);
    const hashPasswordPromise = hashPassword(password, this.configService);

    const [user, hashedPassword] = await Promise.all([
      userPromise,
      hashPasswordPromise,
    ]);

    if (!user)
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'Invalid or expired token',
      });

    await this.dataSource.manager.transaction(
      async (transactionalEntityManager) => {
        await this.usersService.updatePassword(
          user.id,
          hashedPassword,
          transactionalEntityManager,
        );

        // Delete the reset password token before updating the password
        await this.usersService.deletePasswordResetToken(
          user.id,
          transactionalEntityManager,
        );
      },
    );

    return { message: 'Password reset successfully' };
  }
}
