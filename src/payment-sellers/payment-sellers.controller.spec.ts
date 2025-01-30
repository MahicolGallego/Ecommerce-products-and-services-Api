import { Test, TestingModule } from '@nestjs/testing';
import { PaymentSellersController } from './payment-sellers.controller';
import { PaymentSellersService } from './payment-sellers.service';

describe('PaymentSellersController', () => {
  let controller: PaymentSellersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentSellersController],
      providers: [PaymentSellersService],
    }).compile();

    controller = module.get<PaymentSellersController>(PaymentSellersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
