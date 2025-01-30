import { Test, TestingModule } from '@nestjs/testing';
import { RefundHistoriesService } from './refund-histories.service';

describe('RefundHistoriesService', () => {
  let service: RefundHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefundHistoriesService],
    }).compile();

    service = module.get<RefundHistoriesService>(RefundHistoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
