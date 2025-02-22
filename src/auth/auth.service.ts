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

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
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
    const payload: IPayloadToken = {
      sub: user.id,
      role: user.role,
    };

    const userToResponse = plainToClass(User, user);

    return {
      access_token: this.jwtService.sign(payload),
      user: userToResponse,
    };
  }
}
