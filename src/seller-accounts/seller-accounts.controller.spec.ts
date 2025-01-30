import { Test, TestingModule } from '@nestjs/testing';
import { SellerAccountsController } from './seller-accounts.controller';
import { SellerAccountsService } from './seller-accounts.service';

describe('SellerAccountsController', () => {
  let controller: SellerAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellerAccountsController],
      providers: [SellerAccountsService],
    }).compile();

    controller = module.get<SellerAccountsController>(SellerAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
