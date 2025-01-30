// src/seller-refunds/entities/seller-refund.entity.ts
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
import { Refund } from '../../refunds/entities/refund.entity';
import { User } from '../../users/entities/user.entity';
import { SellerRefundStatus } from 'src/common/constants/enums/seller-refund-status.enum';

@Entity('seller_refund')
export class SellerRefund {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the seller refund (UUID)',
  })
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @ApiProperty({
    example: '254f4567-e89b-12d3-a456-426614174675',
    description: 'Unique identifier of the associated refund (UUID)',
  })
  @Column({ type: 'uuid', nullable: false, unique: true })
  refund_id: string;

  @ApiProperty({
    example: '354f4567-e89b-12d3-a456-426614174675',
    description: 'Unique identifier of the seller (UUID)',
  })
  @Column({ type: 'uuid', nullable: false })
  seller_id: string;

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
    example: 'pending',
    description: 'Status of the refund (pending, paid, failed)',
    enum: SellerRefundStatus,
  })
  @Column({
    type: 'enum',
    enum: SellerRefundStatus,
    default: SellerRefundStatus.PENDING,
  })
  @Expose()
  status: SellerRefundStatus;

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
    example: '2023-10-01T12:00:00Z',
    description: 'Date when the seller refund record was created',
  })
  @CreateDateColumn()
  @Expose()
  created_at: Date;

  @ApiProperty({
    example: '2023-10-02T12:00:00Z',
    description: 'Date when the seller refund record was last updated',
  })
  @UpdateDateColumn()
  @Expose()
  updated_at: Date;

  // Relations ---------------------------------------------

  @OneToOne(() => Refund, (refund) => refund.seller_refund)
  @JoinColumn({ name: 'refund_id' })
  refund: Refund;

  @ManyToOne(() => User, (user) => user.seller_refunds)
  @JoinColumn({ name: 'seller_id' })
  seller: User;
}
