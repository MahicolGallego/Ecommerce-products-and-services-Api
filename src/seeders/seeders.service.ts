import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from 'src/permissions/dto/create-permission.dto';
import { PermissionsService } from 'src/permissions/permissions.service';
import {
  PermissionsSeeder,
  ProductsAndVariantsSeeder,
  UsersSeeder,
} from './seeders-data';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Roles } from 'src/common/constants/enums/roles.enum';
import { UsersService } from 'src/users/users.service';
import { validatorEmail } from 'src/common/helpers/validator-email.helper';
import { ProductsService } from 'src/products/products.service';
import { ProductVariantsService } from 'src/product-variants/product-variants.service';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class SeedersService {
  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly productVariantsService: ProductVariantsService,
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

  async ProductAndProductVariantsSeeder() {
    const productsAndVariants = ProductsAndVariantsSeeder;

    for (const productAndVariants of productsAndVariants) {
      const { email_seller, product, variants } = productAndVariants;
      const { name } = product;

      const seller = await this.usersService.findByEmail(email_seller);

      if (!seller) {
        console.log(`Error\nSeller not found:\n{email: ${email_seller}}`);
        console.log(
          `Product and its variants have not been inserted\n${JSON.stringify(product)}\nvariants\n${variants.length ? JSON.stringify(variants) : 'No variants'}`,
        );
        continue;
      }

      const productExist = await this.productsService.findOneBy({
        seller_id: seller.id,
        name,
      });

      let newProduct: Product;

      if (productExist) {
        console.log(
          `Product already exist for the store ${email_seller}:\n${JSON.stringify(product)}}`,
        );
      } else {
        const { product: productRegistered } =
          await this.productsService.create(seller.id, product);
        newProduct = productRegistered;

        console.log(
          `New registered Product for the store ${email_seller}:\n${JSON.stringify(product)}}`,
        );
      }

      if (variants) {
        for (const variant of variants) {
          const { size, color } = variant;
          const product_id = newProduct ? newProduct.id : productExist.id;
          const variantExist = await this.productVariantsService.findOneBy({
            product_id,
            size,
            color,
          });

          if (variantExist) {
            console.log(
              `Variant already exist for the product ${name}:\n${JSON.stringify(variant)}}`,
            );
            continue;
          } else {
            await this.productVariantsService.create(
              { ...variant, product_id },
              seller.id,
            );
            console.log(`New registered Variant:\n${JSON.stringify(variant)}}`);
          }
        }
      } else {
        console.log('No variants');
      }
    }
  }
}
