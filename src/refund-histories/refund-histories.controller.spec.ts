import { Test, TestingModule } from '@nestjs/testing';
import { RefundHistoriesController } from './refund-histories.controller';
import { RefundHistoriesService } from './refund-histories.service';

describe('RefundHistoriesController', () => {
  let controller: RefundHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RefundHistoriesController],
      providers: [RefundHistoriesService],
    }).compile();

    controller = module.get<RefundHistoriesController>(RefundHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
