import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from 'src/common/constants/enums/payment_method.enum';
import { PaymentStatus } from 'src/common/constants/enums/payment-status.enum';
import { Order } from 'src/orders/entities/order.entity';
import { Transform } from 'class-transformer';

@Entity('payment')
export class Payment {
  @ApiProperty({ description: 'Unique identifier for the payment.' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Order identifier associated with the payment.' })
  @Column({ type: 'uuid', unique: true })
  order_id: string;

  @ApiProperty({
    description: 'Payment method used.',
    enum: PaymentMethod,
  })
  @Column({ type: 'enum', enum: PaymentMethod })
  payment_method: PaymentMethod;

  @ApiProperty({
    description: 'Payment status.',
    enum: PaymentStatus,
  })
  @Column({ type: 'enum', enum: PaymentStatus })
  status: PaymentStatus;

  @ApiProperty({ description: 'Amount paid.' })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  amount: number;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'Date of the payment',
  })
  // assure that the value is a Date type
  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @Column({ type: 'timestamp' })
  payment_date: Date;

  @ApiProperty({ description: 'Creation date of the payment.' })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ description: 'Last update date of the payment.' })
  @UpdateDateColumn()
  updated_at: Date;

  // Relations -----------------------------------

  @OneToOne(() => Order, (order) => order.payment)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
