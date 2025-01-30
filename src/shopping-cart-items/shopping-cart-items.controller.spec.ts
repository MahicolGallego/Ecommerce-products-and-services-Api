import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingCartItemsController } from './shopping-cart-items.controller';
import { ShoppingCartItemsService } from './shopping-cart-items.service';

describe('ShoppingCartItemsController', () => {
  let controller: ShoppingCartItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingCartItemsController],
      providers: [ShoppingCartItemsService],
    }).compile();

    controller = module.get<ShoppingCartItemsController>(ShoppingCartItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
