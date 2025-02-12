import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateProductVariantDto } from './create-product-variant.dto';

export class SearchCriteriaProductVariantDto extends OmitType(
  PartialType(CreateProductVariantDto),
  ['price', 'stock'] as const,
) {}
