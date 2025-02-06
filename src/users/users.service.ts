import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
