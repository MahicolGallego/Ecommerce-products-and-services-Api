import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { hashPassword } from 'src/common/helpers/hash-password.helper';
import { ConfigService } from '@nestjs/config';
import { ErrorManager } from 'src/common/exception-filters/error-manager.filter';
import { plainToClass } from 'class-transformer';
import { Roles } from 'src/common/constants/enums/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      if (createUserDto.role === Roles.SELLER && !createUserDto.seller_type)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'The seller user must also be assigned their seller type',
        });

      if (createUserDto.role === Roles.BUYER) createUserDto.seller_type = null;

      createUserDto.password = await hashPassword(
        createUserDto.password,
        this.configService,
      );

      createUserDto.name = createUserDto.name.toLowerCase().trim();
      createUserDto.email = createUserDto.email.toLowerCase().trim();

      const registeredUser = await this.usersRepository.save(createUserDto);

      return plainToClass(User, registeredUser);
    } catch (error) {
      console.log(error);
      throw error instanceof Error
        ? ErrorManager.createErrorSignature(error.message)
        : ErrorManager.createErrorSignature('An unexpected error occurred');
    }
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async findByPasswordResetToken(token: string) {
    return await this.usersRepository.findOne({
      where: { reset_password_token: token },
    });
  }

  async savePasswordResetToken(user_id: string, token: string) {
    try {
      const results = await this.usersRepository.update(
        { id: user_id },
        { reset_password_token: token },
      );
      if (!results.affected)
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'The token has not been set for the requesting user',
        });
    } catch (error) {
      console.log(error);
      throw error instanceof Error
        ? ErrorManager.createErrorSignature(error.message)
        : ErrorManager.createErrorSignature('An unexpected error occurred');
    }
  }

  async updatePassword(
    user_id: string,
    hashedPassword: string,
    transactionalEntityManager: EntityManager,
  ) {
    try {
      const results = await transactionalEntityManager.update(
        User,
        { id: user_id },
        { password: hashedPassword },
      );
      if (!results.affected)
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'The password has not been updated for the requesting user',
        });
    } catch (error) {
      console.log(error);
      throw error instanceof Error
        ? ErrorManager.createErrorSignature(error.message)
        : ErrorManager.createErrorSignature('An unexpected error occurred');
    }
  }

  async deletePasswordResetToken(
    user_id: string,
    transactionalEntityManager: EntityManager,
  ) {
    try {
      const results = await transactionalEntityManager.update(
        User,
        { id: user_id },
        { reset_password_token: null },
      );

      if (!results.affected)
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'The password reset token has not been deleted',
        });
    } catch (error) {
      console.log(error);
      throw error instanceof Error
        ? ErrorManager.createErrorSignature(error.message)
        : ErrorManager.createErrorSignature('An unexpected error occurred');
    }
  }
}
