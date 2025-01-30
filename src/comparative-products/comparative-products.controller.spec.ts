import { Test, TestingModule } from '@nestjs/testing';
import { ComparativeProductsController } from './comparative-products.controller';
import { ComparativeProductsService } from './comparative-products.service';

describe('ComparativeProductsController', () => {
  let controller: ComparativeProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComparativeProductsController],
      providers: [ComparativeProductsService],
    }).compile();

    controller = module.get<ComparativeProductsController>(ComparativeProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
