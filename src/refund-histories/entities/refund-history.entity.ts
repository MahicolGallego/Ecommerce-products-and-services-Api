// src/refund-histories/entities/refund-history.entity.ts
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
import { Refund } from '../../refunds/entities/refund.entity';
import { RefundStatus } from 'src/common/constants/enums/refund-status.enum';
import { RefundReason } from 'src/common/constants/enums/refund-reasons.enum';

@Entity('refund_history')
export class RefundHistory {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the refund history (UUID)',
  })
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @ApiProperty({
    example: '254f4567-e89b-12d3-a456-426614174675',
    description: 'Unique identifier of the associated refund (UUID)',
  })
  @Column({ type: 'uuid', nullable: false })
  refund_id: string;

  @ApiProperty({
    example: 'pending',
    description:
      'Status of the refund (pending, approved, rejected, completed)',
    enum: RefundStatus,
  })
  @Column({ type: 'enum', enum: RefundStatus, default: RefundStatus.PENDING })
  @Expose()
  status: RefundStatus;

  @ApiProperty({
    example: 'incorrect_data',
    description: 'Reason for the status change (if applicable)',
    enum: RefundReason,
    nullable: true,
  })
  @Column({ type: 'enum', enum: RefundReason, nullable: true, default: null })
  @Expose()
  reason: RefundReason;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'Date when the refund history record was created',
  })
  @CreateDateColumn()
  @Expose()
  created_at: Date;

  // Relations -----------------------------------------------

  @ManyToOne(() => Refund, (refund) => refund.refund_histories)
  @JoinColumn({ name: 'refund_id' })
  refund: Refund;
}
