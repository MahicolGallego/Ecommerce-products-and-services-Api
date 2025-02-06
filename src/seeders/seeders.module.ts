import { Module } from '@nestjs/common';
import { SeedersService } from './seeders.service';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PermissionsModule, UsersModule],
  providers: [SeedersService],
  exports: [SeedersService],
})
export class SeedersModule {}
