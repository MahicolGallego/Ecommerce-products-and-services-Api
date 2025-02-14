import { Injectable } from '@nestjs/common';
import { CreateServiceScheduleDto } from './dto/create-service-schedule.dto';
import { UpdateServiceScheduleDto } from './dto/update-service-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceSchedule } from './entities/service-schedule.entity';
import { Repository } from 'typeorm';
import { ServicesService } from 'src/services/services.service';
import { ErrorManager } from 'src/common/exception-filters/error-manager.filter';
import { SearchCriteriaServiceScheduleDto } from './dto/search-criteria-service-schedule.dto';

@Injectable()
export class ServiceSchedulesService {
  constructor(
    @InjectRepository(ServiceSchedule)
    private readonly serviceSchedulesRepository: Repository<ServiceSchedule>,
    private readonly servicesService: ServicesService,
  ) {}

  async create(
    seller_id: string,
    createServiceScheduleDto: CreateServiceScheduleDto,
  ): Promise<ServiceSchedule> {
    try {
      // Check if the service exists
      const service = await this.servicesService.findOne(
        createServiceScheduleDto.service_id,
        seller_id,
      );

      if (!service)
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Service not found',
        });

      // verify if the start time is before the end time
      const today = new Date();
      const startTime = new Date(
        today.setHours(createServiceScheduleDto.start_time),
      );
      const endTime = new Date(
        today.setHours(createServiceScheduleDto.end_time),
      );

      if (startTime >= endTime)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'End time must be greater than start time',
        });

      const startTimeWithFormat = `${createServiceScheduleDto.start_time.toString().padStart(2, '0')}:00:00`;
      const endTimeWithFormat = `${createServiceScheduleDto.end_time.toString().padStart(2, '0')}:00:00`;

      // Check if the service schedule exists
      const serviceSchedule = await this.serviceSchedulesRepository.findOne({
        where: {
          service_id: createServiceScheduleDto.service_id,
          day_of_week: createServiceScheduleDto.day_of_week,
          start_time: startTimeWithFormat,
          end_time: endTimeWithFormat,
        },
      });

      if (serviceSchedule)
        throw new ErrorManager({
          type: 'CONFLICT',
          message: 'Service schedule already exists',
        });

      // verify if the start time and end time dont have a conflict with another schedule
      const serviceScheduleConflict = await this.verifyScheduleConflict(
        service.id,
        createServiceScheduleDto.day_of_week,
        startTime,
        endTime,
      );

      if (serviceScheduleConflict)
        throw new ErrorManager({
          type: 'CONFLICT',
          message: 'Schedule conflict with another schedule exists',
        });

      return await this.serviceSchedulesRepository.save({
        ...createServiceScheduleDto,
        start_time: startTimeWithFormat,
        end_time: endTimeWithFormat,
      });
    } catch (error) {
      console.log(error);

      throw error instanceof Error
        ? ErrorManager.createErrorSignature(error.message)
        : ErrorManager.createErrorSignature('An unexpected error occurred');
    }
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

  async verifyScheduleConflict(
    service_id: string,
    day_of_week: number,
    startTime: Date,
    endTime: Date,
  ): Promise<boolean> {
    // verify if the start time and end time dont have a conflict with another schedule
    const today = new Date();

    const serviceSchedules = await this.serviceSchedulesRepository.find({
      where: {
        service_id,
        day_of_week,
      },
    });

    if (serviceSchedules.length) {
      serviceSchedules.forEach((schedule) => {
        const scheduleStartTime = new Date(
          today.setHours(Number(schedule.start_time.split(':')[0])),
        );

        const scheduleEndTime = new Date(
          today.setHours(Number(schedule.end_time.split(':')[0])),
        );
        if (
          (scheduleStartTime >= startTime && startTime < scheduleEndTime) ||
          (scheduleStartTime >= endTime && endTime < scheduleEndTime)
        )
          return true;
      });
    }

    return false;
  }

  async findOneBy(
    searchCriteria: SearchCriteriaServiceScheduleDto,
  ): Promise<ServiceSchedule> {
    return this.serviceSchedulesRepository.findOneBy(searchCriteria);
  }
}
