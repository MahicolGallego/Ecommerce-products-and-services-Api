import { Module } from '@nestjs/common';
import { PaymentSellersService } from './payment-sellers.service';
import { PaymentSellersController } from './payment-sellers.controller';

@Module({
  controllers: [PaymentSellersController],
  providers: [PaymentSellersService],
})
export class PaymentSellersModule {}
