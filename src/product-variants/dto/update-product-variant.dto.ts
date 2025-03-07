import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateProductVariantDto } from './create-product-variant.dto';

export class UpdateProductVariantDto extends OmitType(
  PartialType(CreateProductVariantDto),
  ['product_id'] as const,
) {}
