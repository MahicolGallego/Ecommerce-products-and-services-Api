import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from 'src/permissions/dto/create-permission.dto';
import { PermissionsService } from 'src/permissions/permissions.service';
import { PermissionsSeeder } from './seeders-data';

@Injectable()
export class SeedersService {
  constructor(private readonly permissionsService: PermissionsService) {}

  async PermissionsSeeder() {
    const permissionsSeeder: CreatePermissionDto[] = PermissionsSeeder;
    for (const permissions of permissionsSeeder) {
      const registeredPermissions =
        await this.permissionsService.create(permissions);

      if (!registeredPermissions) {
        console.log(
          `Error\nPermissions have not been inserted:\n{role: ${permissions.role}, seller_type: ${permissions.seller_type}, entity: ${permissions.entity},  write: ${permissions.write}, read: ${permissions.read}, update: ${permissions.update}, delete: ${permissions.delete}}`,
        );
        return;
      }

      console.log(
        `New registered Permissions:\n{role: ${permissions.role}, seller_type: ${permissions.seller_type}, entity: ${permissions.entity},  write: ${permissions.write}, read: ${permissions.read}, update: ${permissions.update}, delete: ${permissions.delete}}\nAlready exist`,
      );
    }
  }
}
