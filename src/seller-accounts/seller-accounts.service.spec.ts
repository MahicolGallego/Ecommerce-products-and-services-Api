import { Test, TestingModule } from '@nestjs/testing';
import { SellerAccountsService } from './seller-accounts.service';

describe('SellerAccountsService', () => {
  let service: SellerAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SellerAccountsService],
    }).compile();

    service = module.get<SellerAccountsService>(SellerAccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
