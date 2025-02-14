import { Module } from '@nestjs/common';
import { ServiceSchedulesService } from './service-schedules.service';
import { ServiceSchedulesController } from './service-schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceSchedule } from './entities/service-schedule.entity';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceSchedule]), ServicesModule],
  controllers: [ServiceSchedulesController],
  providers: [ServiceSchedulesService],
  exports: [ServiceSchedulesService],
})
export class ServiceSchedulesModule {}
