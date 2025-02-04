import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permissions } from './entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permissions])],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
