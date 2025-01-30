import { Injectable } from '@nestjs/common';
import { CreatePaymentSellerDto } from './dto/create-payment-seller.dto';
import { UpdatePaymentSellerDto } from './dto/update-payment-seller.dto';

@Injectable()
export class PaymentSellersService {
  create(createPaymentSellerDto: CreatePaymentSellerDto) {
    return 'This action adds a new paymentSeller';
  }

  findAll() {
    return `This action returns all paymentSellers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentSeller`;
  }

  update(id: number, updatePaymentSellerDto: UpdatePaymentSellerDto) {
    return `This action updates a #${id} paymentSeller`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentSeller`;
  }
}
