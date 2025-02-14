import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServiceSchedulesService } from './service-schedules.service';
import { CreateServiceScheduleDto } from './dto/create-service-schedule.dto';
import { UpdateServiceScheduleDto } from './dto/update-service-schedule.dto';

@Controller('service-schedules')
export class ServiceSchedulesController {
  constructor(
    private readonly serviceSchedulesService: ServiceSchedulesService,
  ) {}

  // @Post()
  // create(@Body() createServiceScheduleDto: CreateServiceScheduleDto) {
  //   return this.serviceSchedulesService.create(createServiceScheduleDto);
  // }

  @Get()
  findAll() {
    return this.serviceSchedulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceSchedulesService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateServiceScheduleDto: UpdateServiceScheduleDto) {
  //   return this.serviceSchedulesService.update(+id, updateServiceScheduleDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceSchedulesService.remove(+id);
  }
}
