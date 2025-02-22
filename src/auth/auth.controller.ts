import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Request } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ILoginResponse } from 'src/common/interfaces/auth/login-response.interface';

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
  async Register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: 'Login a user',
    description:
      'Authenticate a user using email and password. Returns a JWT token and user information.',
  })
  @ApiBody({
    description: 'Credentials for login',
    schema: {
      example: {
        email: 'user@example.com',
        password: 'your_password',
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Login successful. JWT token and user data returned.',
    schema: {
      example: {
        accessToken: 'JWT_TOKEN',
        user: {
          id: 'uuid',
          name: 'Jane Smith',
          email: 'janesmith@example.com',
          role: 'buyer',
          seller_type: 'null',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials provided.',
    schema: {
      example: {
        statusCode: 401,
        message: 'Invalid credentials',
        error: 'Unauthorized',
      },
    },
  })
  async login(@Req() req: Request): Promise<ILoginResponse> {
    const user = req.user as User;
    const JwtTokenAndUser = this.authService.generateJwtToken(user);
    return JwtTokenAndUser;
  }
}
