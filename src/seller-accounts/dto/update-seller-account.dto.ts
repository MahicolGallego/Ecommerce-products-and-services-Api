import { PartialType } from '@nestjs/swagger';
import { CreateSellerAccountDto } from './create-seller-account.dto';

export class UpdateSellerAccountDto extends PartialType(CreateSellerAccountDto) {}
