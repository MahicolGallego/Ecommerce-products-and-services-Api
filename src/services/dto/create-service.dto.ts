import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
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
import { DurationType } from 'src/common/constants/enums/duration-types.enum';

export class CreateServiceDto {
  @ApiProperty({
    example: 'Consulting Service',
    description: 'Name of the service',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  name: string;

  @ApiProperty({
    example: 'Detailed description of the consulting service.',
    description: 'Detailed description of the service',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 49.99,
    description: 'Price of the service',
  })
  @IsNotEmpty()
  @IsNumber()
  @Matches(twoDecimalRegex, {
    message: 'The price must be up to 2 decimal places',
  })
  @Transform(({ value }) => parseFloat(value))
  @IsPositive()
  price: number;

  @ApiProperty({
    example: 2,
    description: 'Duration of the service',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  duration: number;

  @ApiProperty({
    example: DurationType.HOURS,
    description: 'Type of service duration (hours or days)',
  })
  @IsNotEmpty()
  @IsEnum(DurationType)
  duration_type: DurationType;

  @ApiProperty({
    example: '123 Main Street, City',
    description: 'Service address if applicable',
  })
  @IsOptional()
  @IsString()
  @Length(3, 255)
  address?: string;
}
