import { Module } from '@nestjs/common';
import { ShoppingCartItemsService } from './shopping-cart-items.service';
import { ShoppingCartItemsController } from './shopping-cart-items.controller';

@Module({
  controllers: [ShoppingCartItemsController],
  providers: [ShoppingCartItemsService],
})
export class ShoppingCartItemsModule {}
