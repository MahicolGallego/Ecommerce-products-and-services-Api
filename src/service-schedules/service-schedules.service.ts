import { Injectable } from '@nestjs/common';
import { CreateServiceScheduleDto } from './dto/create-service-schedule.dto';
import { UpdateServiceScheduleDto } from './dto/update-service-schedule.dto';

@Injectable()
export class ServiceSchedulesService {
  create(createServiceScheduleDto: CreateServiceScheduleDto) {
    return 'This action adds a new serviceSchedule';
  }

  findAll() {
    return `This action returns all serviceSchedules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceSchedule`;
  }

  update(id: number, updateServiceScheduleDto: UpdateServiceScheduleDto) {
    return `This action updates a #${id} serviceSchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceSchedule`;
  }
}
