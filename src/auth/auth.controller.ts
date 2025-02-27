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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Request } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ILoginResponse } from 'src/common/interfaces/auth/login-response.interface';
import { ForgotPasswordDTO } from 'src/users/dto/forgot-password.dto';
import { ResetPasswordDto } from 'src/users/dto/reset-password.dto';

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

  @Post('forgot-password')
  @ApiOperation({ summary: 'Send password recovery email' })
  @ApiBody({
    description: 'Email address to send the password recovery link.',
    type: ForgotPasswordDTO,
  })
  @ApiCreatedResponse({
    description: 'Password recovery email sent successfully.',
  })
  @ApiNotFoundResponse({
    description: 'User not found for the provided email address.',
    schema: {
      example: {
        statusCode: 404,
        message: 'User not found',
        error: 'Not Found',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid email format or other validation errors.',
  })
  @ApiInternalServerErrorResponse({
    description:
      'Internal server error when trying to send the recovery email.',
  })
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDTO,
  ): Promise<{ message: string }> {
    return await this.authService.sendPasswordRecoveryEmail(
      forgotPasswordDto.email,
    );
  }

  @Get('reset-password/:token')
  @ApiOperation({ summary: 'Verify password reset token' })
  @ApiParam({
    name: 'token',
    description: 'The token used for password reset verification.',
    type: String,
  })
  @ApiOkResponse({
    description: 'Password reset token is valid.',
    schema: {
      example: {
        message:
          'Token to reset password is valid. You can now reset your password',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'The token is invalid or expired.',
    schema: {
      example: {
        statusCode: 401,
        message: 'Invalid or expired token',
        error: 'Bad Request',
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error while verifying the token.',
  })
  async verifyToken(
    @Param('token') token: string,
  ): Promise<{ message: string }> {
    return await this.authService.verifyPasswordResetToken(token);
  }

  @Post('reset-password/:token')
  @ApiOperation({ summary: 'Reset user password' })
  @ApiParam({
    name: 'token',
    description: 'The token used for password reset.',
    type: String,
  })
  @ApiBody({
    description: 'New password for the user.',
    type: ResetPasswordDto,
  })
  @ApiCreatedResponse({
    description: 'Password has been successfully reset.',
    schema: {
      example: {
        message: 'Password reset successfully',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid password format or other validation errors.',
  })
  @ApiBadRequestResponse({
    description: 'The token is invalid or expired.',
    schema: {
      example: {
        statusCode: 401,
        message: 'Invalid or expired token',
        error: 'Bad Request',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Password update or token deletion failed for the user.',
    schema: {
      example: {
        statusCode: 404,
        message: 'The password has not been updated for the requesting user',
        error: 'Not Found',
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error while resetting the password.',
  })
  async resetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<{ message: string }> {
    return await this.authService.resetPassword(
      token,
      resetPasswordDto.password,
    );
  }
}
