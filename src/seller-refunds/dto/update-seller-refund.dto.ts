import { PartialType } from '@nestjs/swagger';
import { CreateSellerRefundDto } from './create-seller-refund.dto';

export class UpdateSellerRefundDto extends PartialType(CreateSellerRefundDto) {}
