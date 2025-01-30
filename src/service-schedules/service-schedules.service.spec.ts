import { Test, TestingModule } from '@nestjs/testing';
import { ServiceSchedulesService } from './service-schedules.service';

describe('ServiceSchedulesService', () => {
  let service: ServiceSchedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceSchedulesService],
    }).compile();

    service = module.get<ServiceSchedulesService>(ServiceSchedulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
