import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends OmitType(PartialType(CreateProductDto), [
  'size',
  'color',
  'price',
  'stock',
] as const) {}
