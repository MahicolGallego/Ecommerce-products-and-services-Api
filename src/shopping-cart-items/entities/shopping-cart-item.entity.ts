import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ShoppingCart } from '../../shopping-carts/entities/shopping-cart.entity';
import { ProductVariant } from '../../product-variants/entities/product-variant.entity';
import { Service } from 'src/services/entities/service.entity';

@Entity('shopping_cart_item')
export class ShoppingCartItem {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the shopping cart item (UUID)',
  })
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the associated shopping cart (UUID)',
  })
  @Column({ type: 'uuid', nullable: false })
  cart_id: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Entity identifier (UUID) for product variant (if applicable)',
  })
  @Column({ type: 'uuid', nullable: false })
  product_variant_id?: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Entity identifier (UUID) for service (if applicable)',
  })
  @Column({ type: 'uuid', nullable: false })
  service_id?: string;

  @ApiProperty({
    example: 2,
    description: 'Quantity of the item in the shopping cart',
  })
  @Column({ type: 'int', nullable: false })
  @Expose()
  quantity: number;

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

  // Relations ---------------------------------------------------------

  @ManyToOne(() => ShoppingCart, (cart) => cart.shopping_cart_items)
  @JoinColumn({ name: 'cart_id' })
  shopping_cart: ShoppingCart;

  @ManyToOne(
    () => ProductVariant,
    (productVariant) => productVariant.shopping_cart_items,
    { nullable: true },
  )
  @JoinColumn({ name: 'product_variant_id' })
  product_variant?: ProductVariant;

  @ManyToOne(() => Service, (service) => service.shopping_cart_items, {
    nullable: true,
  })
  @JoinColumn({ name: 'service_id' })
  service?: Service;
}
