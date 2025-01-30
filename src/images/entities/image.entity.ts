import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../products/entities/product.entity';
import { Service } from '../../services/entities/service.entity';

@Entity('image')
export class Image {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the image (UUID)',
  })
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Entity identifier (UUID) for product (if applicable)',
  })
  @Column({ type: 'uuid', nullable: false })
  product_id?: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Entity identifier (UUID) for service (if applicable)',
  })
  @Column({ type: 'uuid', nullable: false })
  service_id?: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'URL of the image',
  })
  @Column({ type: 'varchar', length: 255 })
  @Expose()
  url: string;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'Record creation date',
  })
  @CreateDateColumn()
  @Expose()
  created_at: Date;

  // Relations ---------------------------------------------------------

  @ManyToOne(() => Product, (product) => product.images, { nullable: true })
  @JoinColumn({ name: 'product_id' })
  product?: Product;

  @ManyToOne(() => Service, (service) => service.images, { nullable: true })
  @JoinColumn({ name: 'service_id', referencedColumnName: 'id' })
  service?: Service;
}
