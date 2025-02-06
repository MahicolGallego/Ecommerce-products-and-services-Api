import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { Roles } from 'src/common/constants/enums/roles.enum';
import { SellerType } from 'src/common/constants/enums/seller-types.enum';

export class CreateUserDto {
  @ApiProperty({
    description:
      'Full name of the user, should be between 3 to 100 characters.',
    example: 'Juan Pérez',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  name: string;

  @ApiProperty({
    description: 'User email, must be a valid email format.',
    example: 'juan.perez@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password, must meet security requirements.',
    example: 'Password123*',
  })
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8, // Minimum length of 8 characters
    minLowercase: 1, // At least 1 lowercase letter
    minUppercase: 1, // At least 1 uppercase letter
    minNumbers: 1, // At least 1 number
    minSymbols: 1, // At least 1 symbol
  })
  password: string;

  @ApiProperty({
    description: 'Role of the user (buyer, seller, etc.).',
    example: 'buyer',
    enum: ['buyer', 'seller'],
  })
  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;

  @ApiProperty({
    description: 'Seller type, can be "store" or "service" if applicable.',
    example: 'store',
    enum: ['store', 'service'],
    nullable: true,
  })
  @IsOptional()
  @IsEnum(SellerType)
  seller_type?: SellerType;
}
