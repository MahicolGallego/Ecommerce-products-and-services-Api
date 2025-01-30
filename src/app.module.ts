import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SellerAccountsModule } from './seller-accounts/seller-accounts.module';
import { ProductsModule } from './products/products.module';
import { ProductVariantsModule } from './product-variants/product-variants.module';
import { ComparativeProductsModule } from './comparative-products/comparative-products.module';
import { ServicesModule } from './services/services.module';
import { ServiceSchedulesModule } from './service-schedules/service-schedules.module';
import { ImagesModule } from './images/images.module';
import { ShoppingCartsModule } from './shopping-carts/shopping-carts.module';
import { ShoppingCartItemsModule } from './shopping-cart-items/shopping-cart-items.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { ServiceBookingsModule } from './service-bookings/service-bookings.module';
import { PaymentsModule } from './payments/payments.module';
import { PermissionsModule } from './permissions/permissions.module';
import { PaymentSellersModule } from './payment-sellers/payment-sellers.module';
import { RefundsModule } from './refunds/refunds.module';
import { RefundHistoriesModule } from './refund-histories/refund-histories.module';
import { SellerRefundsModule } from './seller-refunds/seller-refunds.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity.{ts,js}'],
        synchronize:
          configService.get<string>('STAGE') === 'prod' ? false : true, // Automatically synchronize the database schema (development only)
        logging: false, // Enable logging of SQL queries (development only)
      }),
    }),
    UsersModule,
    SellerAccountsModule,
    ProductsModule,
    ProductVariantsModule,
    ComparativeProductsModule,
    ServicesModule,
    ServiceSchedulesModule,
    ImagesModule,
    ShoppingCartsModule,
    ShoppingCartItemsModule,
    OrdersModule,
    OrderItemsModule,
    ServiceBookingsModule,
    PaymentsModule,
    PermissionsModule,
    PaymentSellersModule,
    RefundsModule,
    RefundHistoriesModule,
    SellerRefundsModule,
  ],
})
export class AppModule {}
