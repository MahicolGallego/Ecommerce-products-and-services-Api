import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDTO {
  @ApiProperty({
    description: 'User email, must be a valid email format.',
    example: 'juan.perez@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
