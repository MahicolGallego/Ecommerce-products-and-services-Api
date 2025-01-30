import { PartialType } from '@nestjs/swagger';
import { CreateComparativeProductDto } from './create-comparative-product.dto';

export class UpdateComparativeProductDto extends PartialType(CreateComparativeProductDto) {}
