import { Module } from '@nestjs/common';
import { ServiceSchedulesService } from './service-schedules.service';
import { ServiceSchedulesController } from './service-schedules.controller';

@Module({
  controllers: [ServiceSchedulesController],
  providers: [ServiceSchedulesService],
})
export class ServiceSchedulesModule {}
