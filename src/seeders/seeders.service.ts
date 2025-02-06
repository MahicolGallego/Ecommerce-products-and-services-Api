import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from 'src/permissions/dto/create-permission.dto';
import { PermissionsService } from 'src/permissions/permissions.service';
import { PermissionsSeeder, UsersSeeder } from './seeders-data';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Roles } from 'src/common/constants/enums/roles.enum';
import { UsersService } from 'src/users/users.service';
import { validatorEmail } from 'src/common/helpers/validator-email.helper';

@Injectable()
export class SeedersService {
  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly usersService: UsersService,
  ) {}

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

  async UsersSeeder() {
    const usersSeeder: CreateUserDto[] = UsersSeeder;
    for (const newUser of usersSeeder) {
      if (!validatorEmail(newUser.email)) {
        console.log(
          `Error\nEmail is not valid:\nUser have not been inserted\n{email: ${newUser.email}, password: ${newUser.password}, name: ${newUser.name}, role: ${newUser.role}${newUser.role === Roles.SELLER ? `, seller_type: ${newUser.seller_type}` : ''}}`,
        );
        continue;
      }

      const user = await this.usersService.findByEmail(newUser.email);

      if (user) {
        console.log(
          `Error\nEmail is already registered:\nUser have not been inserted\n{email: ${newUser.email}, password: ${newUser.password}, name: ${newUser.name}, role: ${newUser.role}${newUser.role === Roles.SELLER ? `, seller_type: ${newUser.seller_type}` : ''}}`,
        );
        continue;
      }

      await this.usersService.createUser(newUser);
      console.log(
        `New registered User:\n{email: ${newUser.email}, encrypted_password: ${newUser.password}, name: ${newUser.name}, role: ${newUser.role}${newUser.role === Roles.SELLER ? `, seller_type: ${newUser.seller_type}` : ''}}`,
      );
    }
  }
}
