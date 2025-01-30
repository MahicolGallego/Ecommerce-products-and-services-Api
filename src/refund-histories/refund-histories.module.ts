import { Module } from '@nestjs/common';
import { RefundHistoriesService } from './refund-histories.service';
import { RefundHistoriesController } from './refund-histories.controller';

@Module({
  controllers: [RefundHistoriesController],
  providers: [RefundHistoriesService],
})
export class RefundHistoriesModule {}
