import { Test, TestingModule } from '@nestjs/testing';
import { SellerRefundsService } from './seller-refunds.service';

describe('SellerRefundsService', () => {
  let service: SellerRefundsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SellerRefundsService],
    }).compile();

    service = module.get<SellerRefundsService>(SellerRefundsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
