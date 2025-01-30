import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BookingStatus } from 'src/common/constants/enums/booking-status.enum';
import { Service } from 'src/services/entities/service.entity';
import { OrderItem } from 'src/order-items/entities/order-item.entity';
import { Transform } from 'class-transformer';

@Entity('service_booking')
export class ServiceBooking {
  @ApiProperty({ description: 'Unique identifier for the service booking.' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Service identifier.' })
  @Column({ type: 'uuid', nullable: false })
  service_id: string;

  @ApiProperty({
    description: 'Order item identifier associated with the booking.',
  })
  @Column({ type: 'uuid', unique: true, nullable: false })
  order_item_id: string;

  @ApiProperty({ description: 'Booking date.' })
  // assure that the value is a Date type
  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @Column({ type: 'date' })
  booking_date: Date;

  @ApiProperty({ description: 'Start time of the booking.' })
  @Column({ type: 'time' })
  start_time: string;

  @ApiProperty({ description: 'End time of the booking.' })
  @Column({ type: 'time' })
  end_time: string;

  @ApiProperty({
    description: 'Status of the service booking.',
    enum: BookingStatus,
  })
  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.SCHEDULED,
  })
  status: BookingStatus;

  @ApiProperty({ description: 'Creation date of the booking.' })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ description: 'Last update date of the booking.' })
  @UpdateDateColumn()
  updated_at: Date;

  // Relations ---------------------------------------------

  @ManyToOne(() => Service, (service) => service.service_bookings)
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @OneToOne(() => OrderItem, (orderItem) => orderItem.service_booking)
  @JoinColumn({ name: 'order_item_id' })
  order_item: OrderItem;
}
