import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ComparativeProduct } from '../../comparative-products/entities/comparative-product.entity';
import { Product } from '../../products/entities/product.entity';
import { Service } from '../../services/entities/service.entity';
import { ShoppingCart } from '../../shopping-carts/entities/shopping-cart.entity';
import { Order } from '../../orders/entities/order.entity';
import { PaymentSeller } from '../../payment-sellers/entities/payment-seller.entity';
import { SellerRefund } from '../../seller-refunds/entities/seller-refund.entity';
import { SellerAccount } from '../../seller-accounts/entities/seller-account.entity';
import { Roles } from 'src/common/constants/enums/roles.enum';
import { SellerType } from 'src/common/constants/enums/seller-types.enum';

@Entity('user')
export class User {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'User unique identifier (UUID)',
  })
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @ApiProperty({
    example: 'Juan Pérez',
    description: 'User full name',
  })
  @Column({ type: 'varchar', length: 100 })
  @Expose()
  name: string;

  @ApiProperty({
    example: 'juan.perez@example.com',
    description: 'User email (unique)',
  })
  @Column({ type: 'varchar', length: 100, unique: true })
  @Expose()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password',
  })
  @Column({ type: 'varchar', length: 255 })
  @Exclude() // exclude password of the JSON responses
  password: string;

  @ApiProperty({
    example: 'buyer',
    description: 'user role (buyer, seller, etc.)',
    enum: ['buyer', 'seller'],
  })
  @Column({ type: 'enum', enum: Roles, default: Roles.BUYER })
  @Expose()
  role: Roles;

  @ApiProperty({
    example: 'store',
    description: 'seller type (if applicable)',
    enum: ['store', 'service'],
    nullable: true,
  })
  @Column({ type: 'enum', enum: SellerType, nullable: true, default: null })
  @Expose()
  seller_type: SellerType;

  @ApiProperty({
    example: 'abc123',
    description: 'Temporary token for password recovery',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  @Exclude() // Excluir el token de las respuestas JSON
  reset_password_token: string;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'Record creation date',
  })
  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @ApiProperty({
    example: '2023-10-02T12:00:00Z',
    description: 'Record last updated date',
    nullable: true,
  })
  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;

  //Relations -----------------------------------------------------------

  @OneToOne(() => SellerAccount, (sellerAccount) => sellerAccount.seller)
  seller_account: SellerAccount;

  @OneToMany(() => Product, (product) => product.seller)
  products: Product[];

  @OneToMany(
    () => ComparativeProduct,
    (comparativeProduct) => comparativeProduct.buyer,
  )
  comparative_products: ComparativeProduct[];

  @OneToMany(() => Service, (service) => service.seller)
  services: Service[];

  @OneToOne(() => ShoppingCart, (shoppingCart) => shoppingCart.buyer)
  shopping_cart: ShoppingCart;

  @OneToMany(() => Order, (order) => order.buyer)
  orders: Order[];

  @OneToMany(() => PaymentSeller, (paymentSeller) => paymentSeller.seller)
  payment_sellers: PaymentSeller[];

  @OneToMany(() => SellerRefund, (sellerRefund) => sellerRefund.seller)
  seller_refunds: SellerRefund[];
}
