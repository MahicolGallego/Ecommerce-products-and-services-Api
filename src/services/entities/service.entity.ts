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
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { ShoppingCartItem } from '../../shopping-cart-items/entities/shopping-cart-item.entity';
import { Image } from '../../images/entities/image.entity';
import { ServiceBooking } from '../../service-bookings/entities/service-booking.entity';
import { ServiceSchedule } from '../../service-schedules/entities/service-schedule.entity';
import { DurationType } from 'src/common/constants/enums/duration-types.enum';
import { OrderItem } from 'src/order-items/entities/order-item.entity';

@Entity('service')
export class Service {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the service (UUID)',
  })
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the seller offering the service (UUID)',
  })
  @Column({ type: 'uuid', nullable: false })
  seller_id: string;

  @ApiProperty({
    example: 'Consulting Service',
    description: 'Name of the service',
  })
  @Column({ type: 'varchar', length: 100 })
  @Expose()
  name: string;

  @ApiProperty({
    example: 'Detailed description of the consulting service.',
    description: 'Detailed description of the service',
  })
  @Column({ type: 'text' })
  @Expose()
  description: string;

  @ApiProperty({
    example: 49.99,
    description: 'Price of the service',
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  @Expose()
  price: number;

  @ApiProperty({
    example: 2,
    description: 'Duration of the service',
  })
  @Column({ type: 'int' })
  @Expose()
  duration: number;

  @ApiProperty({
    example: DurationType.HOURS,
    description: 'Type of service duration (hours or days)',
  })
  @Column({ type: 'enum', enum: DurationType })
  @Expose()
  duration_type: DurationType;

  @ApiProperty({
    example: '123 Main Street, City',
    description: 'Service address if applicable',
  })
  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  @Expose()
  address?: string;

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
  @ManyToOne(() => User, (user) => user.services)
  @JoinColumn({ name: 'seller_id' })
  seller: User;

  @OneToMany(() => Image, (image) => image.service)
  images: Image[];

  @OneToMany(
    () => ServiceSchedule,
    (serviceSchedule) => serviceSchedule.service,
  )
  schedules: ServiceSchedule[];

  @OneToMany(
    () => ShoppingCartItem,
    (shoppingCartItem) => shoppingCartItem.service,
  )
  shopping_cart_items: ShoppingCartItem[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.service)
  order_items: OrderItem[];

  @OneToMany(() => ServiceBooking, (serviceBooking) => serviceBooking.service)
  service_bookings: ServiceBooking[];
}
