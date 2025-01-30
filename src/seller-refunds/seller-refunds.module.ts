import { Module } from '@nestjs/common';
import { SellerRefundsService } from './seller-refunds.service';
import { SellerRefundsController } from './seller-refunds.controller';

@Module({
  controllers: [SellerRefundsController],
  providers: [SellerRefundsService],
})
export class SellerRefundsModule {}
