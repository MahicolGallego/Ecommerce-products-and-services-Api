import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from 'src/common/constants/enums/roles.enum';
import { SellerType } from 'src/common/constants/enums/seller-types.enum';

@Entity('permissions')
@Unique(['role', 'seller_type', 'entity'])
export class Permissions {
  @ApiProperty({ description: 'Unique identifier for the permission.' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Role associated with the permission.',
    enum: Roles,
  })
  @Column({ type: 'enum', enum: Roles })
  role: Roles;

  @ApiProperty({
    description: 'Seller type associated with the permission, if applicable.',
    enum: SellerType,
    nullable: true,
  })
  @Column({ type: 'enum', enum: SellerType, nullable: true })
  seller_type: SellerType;

  @ApiProperty({ description: 'Entity over which the permission applies.' })
  @Column({ type: 'varchar' })
  entity: string;

  @ApiProperty({
    description: 'Indicates if the permission allows creating records.',
  })
  @Column({ type: 'boolean', default: false })
  write: boolean;

  @ApiProperty({
    description: 'Indicates if the permission allows reading records.',
  })
  @Column({ type: 'boolean', default: false })
  read: boolean;

  @ApiProperty({
    description: 'Indicates if the permission allows updating records.',
  })
  @Column({ type: 'boolean', default: false })
  update: boolean;

  @ApiProperty({
    description: 'Indicates if the permission allows deleting records.',
  })
  @Column({ type: 'boolean', default: false })
  delete: boolean;

  @ApiProperty({ description: 'Creation date of the permission record.' })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ description: 'Last update date of the permission record.' })
  @UpdateDateColumn()
  updated_at: Date;
}
