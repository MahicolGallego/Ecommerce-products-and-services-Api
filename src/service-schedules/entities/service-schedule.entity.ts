import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Service } from '../../services/entities/service.entity';

@Unique(['service_id', 'day_of_week', 'start_time', 'end_time'])
@Entity('service_schedule')
export class ServiceSchedule {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the schedule (UUID)',
  })
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the associated service (UUID)',
  })
  @Column({ type: 'uuid', nullable: false })
  service_id: string;

  @ApiProperty({
    example: 1,
    description: 'Day of the week (0 = Sunday, 6 = Saturday)',
  })
  @Column({ type: 'smallint', nullable: false })
  @Expose()
  day_of_week: number;

  @ApiProperty({
    example: '09:00:00',
    description: 'Start time of the service',
  })
  @Column({ type: 'time', nullable: false })
  @Expose()
  start_time: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'End time of the service',
  })
  @Column({ type: 'time', nullable: false })
  @Expose()
  end_time: string;

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

  @ManyToOne(() => Service, (service) => service.schedules)
  @JoinColumn({ name: 'service_id' })
  service: Service;
}
