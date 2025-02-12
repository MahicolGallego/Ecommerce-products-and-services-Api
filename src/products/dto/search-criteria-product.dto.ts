import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SearchCriteriaProductDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier for the associate seller (UUID)',
  })
  @IsNotEmpty()
  @IsString()
  seller_id: string;

  @ApiProperty({
    example: 'Smartphone X',
    description: 'Name of the product',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  name: string;
}
