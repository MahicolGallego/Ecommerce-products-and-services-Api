import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { ErrorManager } from 'src/common/exception-filters/error-manager.filter';
import { SearchCriteriaServiceDto } from './dto/search-criteria-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
  ) {}

  async create(seller_id: string, createServiceDto: CreateServiceDto) {
    try {
      createServiceDto.name = createServiceDto.name.toLowerCase().trim();
      createServiceDto.description = createServiceDto.description
        .toLowerCase()
        .trim();

      const service = await this.servicesRepository.findOne({
        where: { seller_id, name: createServiceDto.name },
        withDeleted: true,
      });

      if (service) {
        // If the service is soft deleted, restore it
        if (service.deleted_at) {
          return await this.servicesRepository.save({
            ...service,
            ...createServiceDto,
            deleted_at: null,
          });
        }

        throw new ErrorManager({
          type: 'CONFLICT',
          message: 'Service already exists',
        });
      }

      return await this.servicesRepository.save({
        seller_id,
        ...createServiceDto,
      });
    } catch (error) {
      console.log(error);

      throw error instanceof Error
        ? ErrorManager.createErrorSignature(error.message)
        : ErrorManager.createErrorSignature('An unexpected error occurred');
    }
  }

  findAll() {
    return `This action returns all services`;
  }

  async findOne(id: string, seller_id: string) {
    return await this.servicesRepository.findOne({ where: { id, seller_id } });
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }

  async findOneBy(searchCriteria: SearchCriteriaServiceDto): Promise<Service> {
    return await this.servicesRepository.findOneBy(searchCriteria);
  }
}
