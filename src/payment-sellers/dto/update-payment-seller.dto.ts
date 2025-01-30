import { PartialType } from '@nestjs/swagger';
import { CreatePaymentSellerDto } from './create-payment-seller.dto';

export class UpdatePaymentSellerDto extends PartialType(CreatePaymentSellerDto) {}
