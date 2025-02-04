import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { SearchCriteriaPermissionDto } from './dto/search-criteria-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permissions } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { Roles } from 'src/common/constants/enums/roles.enum';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permissions)
    private readonly permissionsRepository: Repository<Permissions>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permissions> {
    if (
      createPermissionDto.role === Roles.BUYER &&
      createPermissionDto.seller_type
    ) {
      console.log(`The buyer role cannot be assigned a seller type`);
      console.log(
        `Permissions:\n{role: ${createPermissionDto.role}, seller_type: ${createPermissionDto.seller_type}, entity: ${createPermissionDto.entity},  write: ${createPermissionDto.write}, read: ${createPermissionDto.read}, update: ${createPermissionDto.update}, delete: ${createPermissionDto.delete}}`,
      );
      return;
    }

    if (
      createPermissionDto.role === Roles.SELLER &&
      !createPermissionDto.seller_type
    ) {
      console.log(`The seller role must be assigned a seller type`);
      console.log(
        `Permissions:\n{role: ${createPermissionDto.role}, seller_type: ${createPermissionDto.seller_type}, entity: ${createPermissionDto.entity},  write: ${createPermissionDto.write}, read: ${createPermissionDto.read}, update: ${createPermissionDto.update}, delete: ${createPermissionDto.delete}}`,
      );
      return;
    }

    const permissions = await this.findOneBy(createPermissionDto);
    if (permissions) {
      console.log(
        `Permissions:\n{role: ${createPermissionDto.role}, seller_type: ${createPermissionDto.seller_type}, entity: ${createPermissionDto.entity},  write: ${createPermissionDto.write}, read: ${createPermissionDto.read}, update: ${createPermissionDto.update}, delete: ${createPermissionDto.delete}}\nAlready exist`,
      );
      return;
    }

    return await this.permissionsRepository.save(createPermissionDto);
  }

  async findOneBy(searchCriteria: SearchCriteriaPermissionDto) {
    return await this.permissionsRepository.findOneBy(searchCriteria);
  }
}
