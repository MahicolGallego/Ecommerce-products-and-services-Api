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
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Image } from '../../images/entities/image.entity';
import { ProductVariant } from 'src/product-variants/entities/product-variant.entity';

@Entity('product')
export class Product {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier for the product (UUID)',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '154f4567-e89b-12d3-a456-426614174675',
    description: 'Unique identifier of the seller offering the product (UUID)',
  })
  @Column({ type: 'uuid', nullable: false })
  seller_id: string;

  @ApiProperty({
    example: 'Smartphone X',
    description: 'Name of the product',
  })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty({
    example: 'High-end smartphone with advanced features',
    description: 'Detailed description of the product',
  })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({
    example: 'SM-X2024',
    description: 'Reference code for the product',
  })
  @Column({ type: 'varchar', length: 50 })
  reference: string;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'Record creation date',
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    example: '2023-10-02T12:00:00Z',
    description: 'Record last updated date',
  })
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty({
    example: '2023-10-02T12:00:00Z',
    description: 'Record logical deletion date',
  })
  @DeleteDateColumn()
  deleted_at: Date;

  // Relations -----------------------------------------------------------

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'seller_id' })
  seller: User;

  @OneToMany(() => Image, (image) => image.product)
  images: Image[];

  @OneToMany(() => ProductVariant, (productVariant) => productVariant.product)
  variants: ProductVariant[];
}
