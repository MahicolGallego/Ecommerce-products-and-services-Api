import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { ShoppingCartItem } from '../../shopping-cart-items/entities/shopping-cart-item.entity';

@Entity('shopping_cart')
export class ShoppingCart {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the shopping cart (UUID)',
  })
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description:
      'Unique identifier of the buyer associated with the cart (UUID)',
  })
  @Column({ type: 'uuid', nullable: false, unique: true })
  buyer_id: string;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'Record creation date',
  })
  @CreateDateColumn()
  @Expose()
  created_at: Date;

  // Relations ---------------------------------------------------------

  @OneToOne(() => User, (user) => user.shopping_cart)
  @JoinColumn({ name: 'buyer_id' })
  buyer: User;

  @OneToMany(
    () => ShoppingCartItem,
    (shoppingCartItem) => shoppingCartItem.shopping_cart,
  )
  shopping_cart_items: ShoppingCartItem[];
}
