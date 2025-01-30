import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { AccountType } from 'src/common/constants/enums/account-types.enum';

@Entity('seller_account')
export class SellerAccount {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the seller account (UUID)',
  })
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @ApiProperty({
    example: '154f4567-e89b-12d3-a456-426614174675',
    description: 'Unique identifier of the seller owner of account (UUID)',
  })
  @Column({ type: 'uuid', nullable: false })
  seller_id: string;

  @ApiProperty({
    example: '1234567890',
    description: 'Bank account number of the seller',
  })
  @Column({ type: 'varchar', length: 50 })
  @Expose()
  account_number: string;

  @ApiProperty({
    example: 'current',
    description: 'Type of bank account (current, savings)',
    enum: AccountType,
  })
  @Column({ type: 'enum', enum: AccountType })
  @Expose()
  account_type: AccountType;

  @ApiProperty({
    example: 'Bank of America',
    description: 'Name of the bank',
  })
  @Column({ type: 'varchar', length: 100 })
  @Expose()
  bank_name: string;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'Date when the seller account was created',
  })
  @CreateDateColumn()
  @Expose()
  created_at: Date;

  @ApiProperty({
    example: '2023-10-02T12:00:00Z',
    description: 'Date when the seller account was last updated',
  })
  @UpdateDateColumn()
  @Expose()
  updated_at: Date;

  //Relations -----------------------------------------------------------

  @OneToOne(() => User, (user) => user.seller_account)
  @JoinColumn({ name: 'seller_id' })
  seller: User;
}
