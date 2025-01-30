import { Test, TestingModule } from '@nestjs/testing';
import { PaymentSellersService } from './payment-sellers.service';

describe('PaymentSellersService', () => {
  let service: PaymentSellersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentSellersService],
    }).compile();

    service = module.get<PaymentSellersService>(PaymentSellersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
