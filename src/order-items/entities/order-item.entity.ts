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
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../../orders/entities/order.entity';
import { ProductVariant } from '../../product-variants/entities/product-variant.entity';
import { Service } from '../../services/entities/service.entity';
import { Refund } from '../../refunds/entities/refund.entity';
import { PaymentSeller } from '../../payment-sellers/entities/payment-seller.entity';
import { ServiceBooking } from '../../service-bookings/entities/service-booking.entity';
import { OrderItemStatus } from 'src/common/constants/enums/order-item-status.enum';
import { CancelledBy } from 'src/common/constants/cancelled-by.enum';

@Entity('order_item')
export class OrderItem {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the order item (UUID)',
  })
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Order identifier (UUID)',
  })
  @Column({ type: 'uuid', nullable: false })
  order_id: string;

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
    example: 3,
    description: 'Quantity of the product or service',
  })
  @Column({ type: 'int', nullable: false })
  @Expose()
  quantity: number;

  @ApiProperty({
    example: 49.99,
    description: 'Unit price of the product or service',
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value), // Converts when reading from the database
    },
  })
  @Expose()
  unit_price: number;

  @ApiProperty({
    example: 149.97,
    description: 'Subtotal for the order item (quantity * unit price)',
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value), // Converts when reading from the database
    },
  })
  @Expose()
  subtotal: number;

  @ApiProperty({
    example: 'PENDING',
    description: 'Status of the order item',
    enum: OrderItemStatus,
  })
  @Column({
    type: 'enum',
    enum: OrderItemStatus,
    default: OrderItemStatus.PENDING,
  })
  @Expose()
  status: OrderItemStatus;

  @ApiProperty({
    example: 'BUYER',
    description: 'Who cancelled the order item (if applicable)',
    enum: CancelledBy,
  })
  @Column({ type: 'enum', enum: CancelledBy, nullable: true, default: null })
  @Expose()
  cancelled_by?: CancelledBy;

  @ApiProperty({
    example: 'Client changed their mind',
    description: 'Reason for cancellation (if applicable)',
  })
  @Column({ type: 'text', nullable: true, default: null })
  @Expose()
  cancellation_reason?: string;

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

  @ManyToOne(() => Order, (order) => order.order_items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(
    () => ProductVariant,
    (productVariant) => productVariant.order_items,
    { nullable: true },
  )
  @JoinColumn({ name: 'product_variant_id' })
  product_variant?: ProductVariant;

  @ManyToOne(() => Service, (service) => service.order_items, {
    nullable: true,
  })
  @JoinColumn({ name: 'service_id' })
  service?: Service;

  @OneToOne(
    () => ServiceBooking,
    (serviceBooking) => serviceBooking.order_item,
    { nullable: true },
  )
  service_booking?: ServiceBooking;

  @OneToOne(() => PaymentSeller, (paymentSeller) => paymentSeller.order_item)
  payment_sellers: PaymentSeller;

  @OneToOne(() => Refund, (refund) => refund.order_item)
  refund: Refund;
}
