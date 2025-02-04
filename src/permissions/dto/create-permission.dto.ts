import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsString,
} from 'class-validator';
import { Roles } from 'src/common/constants/enums/roles.enum';
import { SellerType } from 'src/common/constants/enums/seller-types.enum';

export class CreatePermissionDto {
  @ApiProperty({
    description: 'Role associated with the permission.',
    enum: Roles,
    example: Roles.BUYER,
  })
  @IsEnum(Roles)
  @IsNotEmpty()
  role: Roles;

  @ApiProperty({
    description: 'Seller type associated with the permission, if applicable.',
    enum: SellerType,
    example: SellerType.STORE,
    nullable: true,
  })
  @IsEnum(SellerType)
  @IsOptional()
  seller_type: SellerType;

  @ApiProperty({
    description: 'Entity over which the permission applies.',
    example: 'product',
  })
  @IsString()
  @IsNotEmpty()
  entity: string;

  @ApiProperty({
    description: 'Indicates if the permission allows creating records.',
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  write: boolean;

  @ApiProperty({
    description: 'Indicates if the permission allows reading records.',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  read: boolean;

  @ApiProperty({
    description: 'Indicates if the permission allows updating records.',
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  update: boolean;

  @ApiProperty({
    description: 'Indicates if the permission allows deleting records.',
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  delete: boolean;
}
