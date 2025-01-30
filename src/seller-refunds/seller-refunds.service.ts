import { Injectable } from '@nestjs/common';
import { CreateSellerRefundDto } from './dto/create-seller-refund.dto';
import { UpdateSellerRefundDto } from './dto/update-seller-refund.dto';

@Injectable()
export class SellerRefundsService {
  create(createSellerRefundDto: CreateSellerRefundDto) {
    return 'This action adds a new sellerRefund';
  }

  findAll() {
    return `This action returns all sellerRefunds`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sellerRefund`;
  }

  update(id: number, updateSellerRefundDto: UpdateSellerRefundDto) {
    return `This action updates a #${id} sellerRefund`;
  }

  remove(id: number) {
    return `This action removes a #${id} sellerRefund`;
  }
}
