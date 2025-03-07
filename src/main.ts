import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SeedersService } from './seeders/seeders.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  //enable CORS (Cross-Origin Resource Sharing)
  app.enableCors();

  // validations and data transformations
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  //enable deserialization of response objects (apply class-transformer)

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  // seeders execute
  const seedersService = app.get(SeedersService);
  await seedersService.PermissionsSeeder();
  console.log('Permissions seeding completes.');
  await seedersService.UsersSeeder();
  console.log('Users seeding completed.');
  await seedersService.ProductAndProductVariantsSeeder();
  console.log('Products and its Variants seeding completed.');
  await seedersService.ServicesAndServiceSchedulesSeeder();
  console.log('Services and its Schedules seeding completed.');

  const config = new DocumentBuilder()
    .setTitle('Ecommerce Products And Services API')
    .setDescription(
      'This API enables the management of an e-commerce platform for products and services. It includes features such as shopping cart management, orders, payments, refunds, and product comparison. Sellers can manage their accounts, product variants, and service schedules. The API implements Role-Based Access Control (RBAC) to restrict actions based on user roles (e.g., buyer, seller) and seller types (e.g., store, service provider). Authentication is secured via Bearer tokens, ensuring secure operations throughout the platform.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(
    'ecommerce-products-and-service/api/v1/docs',
    app,
    documentFactory,
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
