// src/refunds/entities/refund.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { OrderItem } from '../../order-items/entities/order-item.entity';
import { RefundType } from 'src/common/constants/enums/refund-types.enum';
import { RefundHistory } from 'src/refund-histories/entities/refund-history.entity';
import { SellerRefund } from 'src/seller-refunds/entities/seller-refund.entity';

@Entity('refund')
export class Refund {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the refund (UUID)',
  })
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @ApiProperty({
    example: '254f4567-e89b-12d3-a456-426614174675',
    description: 'Unique identifier of the associated order item (UUID)',
  })
  @Column({ type: 'uuid', nullable: false })
  order_item_id: string;

  @ApiProperty({
    example: 'partial',
    description: 'Type of refund (partial, full)',
    enum: RefundType,
  })
  @Column({ type: 'enum', enum: RefundType })
  @Expose()
  refund_type: RefundType;

  @ApiProperty({
    example: '1234567890',
    description: 'Refund account',
  })
  @Column({ type: 'varchar', length: 50 })
  @Expose()
  refund_account: string;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'Date of the refund',
  })
  // assure that the value is a Date type
  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @Column({ type: 'timestamp' })
  @Expose()
  refund_date: Date;

  @ApiProperty({
    example: 50.75,
    description: 'Amount of the refund',
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
  refund_amount: number;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'Date when the refund record was created',
  })
  @CreateDateColumn()
  @Expose()
  created_at: Date;

  @ApiProperty({
    example: '2023-10-02T12:00:00Z',
    description: 'Date when the refund record was last updated',
  })
  @UpdateDateColumn()
  @Expose()
  updated_at: Date;

  // Relations -----------------------------------------------

  @OneToOne(() => OrderItem, (orderItem) => orderItem.refund)
  @JoinColumn({ name: 'order_item_id' })
  order_item: OrderItem;

  @OneToMany(() => RefundHistory, (refundHistory) => refundHistory.refund)
  refund_histories: RefundHistory[];

  @OneToOne(() => SellerRefund, (sellerRefund) => sellerRefund.refund)
  seller_refund: SellerRefund;
}
