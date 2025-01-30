import { Test, TestingModule } from '@nestjs/testing';
import { SellerRefundsController } from './seller-refunds.controller';
import { SellerRefundsService } from './seller-refunds.service';

describe('SellerRefundsController', () => {
  let controller: SellerRefundsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellerRefundsController],
      providers: [SellerRefundsService],
    }).compile();

    controller = module.get<SellerRefundsController>(SellerRefundsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
