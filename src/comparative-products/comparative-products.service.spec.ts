import { Test, TestingModule } from '@nestjs/testing';
import { ComparativeProductsService } from './comparative-products.service';

describe('ComparativeProductsService', () => {
  let service: ComparativeProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComparativeProductsService],
    }).compile();

    service = module.get<ComparativeProductsService>(ComparativeProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
