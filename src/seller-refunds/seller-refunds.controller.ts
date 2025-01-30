import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SellerRefundsService } from './seller-refunds.service';
import { CreateSellerRefundDto } from './dto/create-seller-refund.dto';
import { UpdateSellerRefundDto } from './dto/update-seller-refund.dto';

@Controller('seller-refunds')
export class SellerRefundsController {
  constructor(private readonly sellerRefundsService: SellerRefundsService) {}

  @Post()
  create(@Body() createSellerRefundDto: CreateSellerRefundDto) {
    return this.sellerRefundsService.create(createSellerRefundDto);
  }

  @Get()
  findAll() {
    return this.sellerRefundsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellerRefundsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSellerRefundDto: UpdateSellerRefundDto) {
    return this.sellerRefundsService.update(+id, updateSellerRefundDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellerRefundsService.remove(+id);
  }
}
