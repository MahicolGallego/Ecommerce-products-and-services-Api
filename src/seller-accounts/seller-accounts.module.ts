import { Module } from '@nestjs/common';
import { SellerAccountsService } from './seller-accounts.service';
import { SellerAccountsController } from './seller-accounts.controller';

@Module({
  controllers: [SellerAccountsController],
  providers: [SellerAccountsService],
})
export class SellerAccountsModule {}
