import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../products/entities/product.entity';
import { ShoppingCartItem } from '../../shopping-cart-items/entities/shopping-cart-item.entity';
import { OrderItem } from '../../order-items/entities/order-item.entity';
import { ComparativeProduct } from '../../comparative-products/entities/comparative-product.entity';

@Unique(['product_id', 'size', 'color'])
@Entity('product_variant')
export class ProductVariant {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the product variant (UUID)',
  })
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the associated product (UUID)',
  })
  @Column({ type: 'uuid', nullable: false })
  product_id: string;

  @ApiProperty({
    example: 'L',
    description: 'Size of the product variant',
  })
  @Column({ type: 'varchar', length: 10 })
  @Expose()
  size: string;

  @ApiProperty({
    example: 'Red',
    description: 'Color of the product variant',
  })
  @Column({ type: 'varchar', length: 30 })
  @Expose()
  color: string;

  @ApiProperty({
    example: 19.99,
    description: 'Price of the product variant',
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value), // Converts when reading from the database
    },
  })
  @Expose()
  price: number;

  @ApiProperty({
    example: 50,
    description: 'Stock quantity of the product variant',
  })
  @Column({ type: 'int' })
  @Expose()
  stock: number;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'Record creation date',
  })
  @CreateDateColumn()
  @Expose()
  created_at: Date;

  @ApiProperty({
    example: '2023-10-02T12:00:00Z',
    description: 'Record last updated date',
  })
  @UpdateDateColumn()
  @Expose()
  updated_at: Date;

  @ApiProperty({
    example: '2023-10-02T12:00:00Z',
    description: 'Record logical deletion date',
  })
  @DeleteDateColumn()
  deleted_at: Date;

  // Relations ---------------------------------------------------------

  @ManyToOne(() => Product, (product) => product.variants)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToMany(
    () => ShoppingCartItem,
    (shoppingCartItem) => shoppingCartItem.product_variant,
  )
  shopping_cart_items: ShoppingCartItem[];

  @OneToMany(
    () => ComparativeProduct,
    (comparativeProduct) => comparativeProduct.product_variant,
  )
  comparative_products: ComparativeProduct[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product_variant)
  order_items: OrderItem[];
}
