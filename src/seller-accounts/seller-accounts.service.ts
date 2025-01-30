import { Injectable } from '@nestjs/common';
import { CreateSellerAccountDto } from './dto/create-seller-account.dto';
import { UpdateSellerAccountDto } from './dto/update-seller-account.dto';

@Injectable()
export class SellerAccountsService {
  create(createSellerAccountDto: CreateSellerAccountDto) {
    return 'This action adds a new sellerAccount';
  }

  findAll() {
    return `This action returns all sellerAccounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sellerAccount`;
  }

  update(id: number, updateSellerAccountDto: UpdateSellerAccountDto) {
    return `This action updates a #${id} sellerAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} sellerAccount`;
  }
}
