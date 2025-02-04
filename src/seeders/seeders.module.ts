import { Module } from '@nestjs/common';
import { SeedersService } from './seeders.service';
import { PermissionsModule } from 'src/permissions/permissions.module';

@Module({
  imports: [PermissionsModule],
  providers: [SeedersService],
  exports: [SeedersService],
})
export class SeedersModule {}
