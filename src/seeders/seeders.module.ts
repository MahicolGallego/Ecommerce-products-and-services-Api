import { Module } from '@nestjs/common';
import { SeedersService } from './seeders.service';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { ProductVariantsModule } from 'src/product-variants/product-variants.module';

@Module({
  imports: [
    PermissionsModule,
    UsersModule,
    ProductsModule,
    ProductVariantsModule,
  ],
  providers: [SeedersService],
  exports: [SeedersService],
})
export class SeedersModule {}
