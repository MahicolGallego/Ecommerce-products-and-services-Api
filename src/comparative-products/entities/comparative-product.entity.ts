import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { ProductVariant } from '../../product-variants/entities/product-variant.entity';

@Unique(['buyer_id', 'product_variant_id'])
@Entity('comparative_product')
export class ComparativeProduct {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the comparative product (UUID)',
  })
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the buyer (UUID)',
  })
  @Column({ type: 'uuid', nullable: false })
  buyer_id: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the product variant (UUID)',
  })
  @Column({ type: 'uuid', nullable: false })
  product_variant_id: string;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'Record creation date',
  })
  @CreateDateColumn()
  @Expose()
  created_at: Date;

  // Relations ---------------------------------------------------------

  @ManyToOne(() => User, (user) => user.comparative_products)
  @JoinColumn({ name: 'buyer_id' })
  buyer: User;

  @ManyToOne(
    () => ProductVariant,
    (productVariant) => productVariant.comparative_products,
  )
  @JoinColumn({ name: 'product_variant_id' })
  product_variant: ProductVariant;
}
