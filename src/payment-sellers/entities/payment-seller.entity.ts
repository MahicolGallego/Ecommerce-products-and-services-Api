import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { OrderItem } from '../../order-items/entities/order-item.entity';
import { PaymentStatus } from 'src/common/constants/enums/payment-status.enum';

@Entity('payment_seller')
export class PaymentSeller {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the payment to the seller (UUID)',
  })
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @ApiProperty({
    example: '154f4567-e89b-12d3-a456-426614174675',
    description: 'Unique identifier of the seller (UUID)',
  })
  @Column({ type: 'uuid', nullable: false })
  seller_id: string;

  @ApiProperty({
    example: '254f4567-e89b-12d3-a456-426614174675',
    description: 'Unique identifier of the associated order item (UUID)',
  })
  @Column({ type: 'uuid', nullable: false, unique: true })
  order_item_id: string;

  @ApiProperty({
    example: 100.5,
    description: 'Total amount paid to the seller',
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
  amount: number;

  @ApiProperty({
    example: 10.0,
    description: 'Platform commission fee',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Expose()
  platform_fee: number;

  @ApiProperty({
    example: 'b4c70f6b12e44a7bbd7e52e2fbd6541a',
    description: 'Token representing the seller’s payment method',
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  @Expose()
  payment_account_token: string;

  @ApiProperty({
    example: PaymentStatus.SUCCESS,
    description: 'Status of the payment (pending, success, failed)',
  })
  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  @Expose()
  status: PaymentStatus;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'Date of the payment',
  })
  // assure that the value is a Date type
  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @Column({ type: 'timestamp' })
  @Expose()
  payment_date: Date;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'Date when the payment record was created',
  })
  @CreateDateColumn()
  @Expose()
  created_at: Date;

  @ApiProperty({
    example: '2023-10-02T12:00:00Z',
    description: 'Date when the payment record was last updated',
  })
  @UpdateDateColumn()
  @Expose()
  updated_at: Date;

  // Relations ----------------------------------------

  @ManyToOne(() => User, (user) => user.payment_sellers)
  @JoinColumn({ name: 'seller_id' })
  seller: User;

  @OneToOne(() => OrderItem, (orderItem) => orderItem.payment_sellers)
  @JoinColumn({ name: 'order_item_id' })
  order_item: OrderItem;
}
