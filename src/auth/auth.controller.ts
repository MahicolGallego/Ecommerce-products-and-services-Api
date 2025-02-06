import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    description: 'The data needed to create a new user.',
    type: CreateUserDto, // The DTO class used for the request body
  })
  @ApiCreatedResponse({
    description: 'User registered successfully.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'The provided data is incorrect or incomplete.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error while trying to register the user.',
  })
  Register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.createUser(createUserDto);
  }
}
