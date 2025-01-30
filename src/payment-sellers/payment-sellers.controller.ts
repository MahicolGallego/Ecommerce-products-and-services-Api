import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentSellersService } from './payment-sellers.service';
import { CreatePaymentSellerDto } from './dto/create-payment-seller.dto';
import { UpdatePaymentSellerDto } from './dto/update-payment-seller.dto';

@Controller('payment-sellers')
export class PaymentSellersController {
  constructor(private readonly paymentSellersService: PaymentSellersService) {}

  @Post()
  create(@Body() createPaymentSellerDto: CreatePaymentSellerDto) {
    return this.paymentSellersService.create(createPaymentSellerDto);
  }

  @Get()
  findAll() {
    return this.paymentSellersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentSellersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentSellerDto: UpdatePaymentSellerDto) {
    return this.paymentSellersService.update(+id, updatePaymentSellerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentSellersService.remove(+id);
  }
}
