import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator';
import { twoDecimalRegex } from 'src/common/constants/regex/two-decimal.regex';

export class CreateProductDto {
  @ApiProperty({
    example: 'Smartphone X',
    description: 'Name of the product',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  name: string;

  @ApiProperty({
    example: 'High-end smartphone with advanced features',
    description: 'Detailed description of the product',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'SM-X2024',
    description: 'Reference code for the product',
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 10)
  reference: string;

  @ApiProperty({
    example: 'L',
    description: 'Size of the product',
  })
  @IsOptional()
  @IsString()
  @Length(1, 5)
  size: string;

  @ApiProperty({
    example: 'Red',
    description: 'Color of the product',
  })
  @IsOptional()
  @IsString()
  @Length(3)
  color: string;

  @ApiProperty({
    example: 19.99,
    description: 'Price of the product',
  })
  @IsNotEmpty()
  @IsNumber()
  @Matches(twoDecimalRegex, {
    message: 'The price must be up to 2 decimal places',
  })
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @ApiProperty({
    example: 50,
    description: 'Stock quantity of the product',
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Min(1)
  stock: number;
}
