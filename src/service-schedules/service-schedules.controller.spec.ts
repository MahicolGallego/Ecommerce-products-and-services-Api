import { Test, TestingModule } from '@nestjs/testing';
import { ServiceSchedulesController } from './service-schedules.controller';
import { ServiceSchedulesService } from './service-schedules.service';

describe('ServiceSchedulesController', () => {
  let controller: ServiceSchedulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceSchedulesController],
      providers: [ServiceSchedulesService],
    }).compile();

    controller = module.get<ServiceSchedulesController>(ServiceSchedulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
