import { Module } from '@nestjs/common';
import { ComparativeProductsService } from './comparative-products.service';
import { ComparativeProductsController } from './comparative-products.controller';

@Module({
  controllers: [ComparativeProductsController],
  providers: [ComparativeProductsService],
})
export class ComparativeProductsModule {}
