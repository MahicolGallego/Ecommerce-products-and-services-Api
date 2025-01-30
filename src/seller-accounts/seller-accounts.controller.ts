import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SellerAccountsService } from './seller-accounts.service';
import { CreateSellerAccountDto } from './dto/create-seller-account.dto';
import { UpdateSellerAccountDto } from './dto/update-seller-account.dto';

@Controller('seller-accounts')
export class SellerAccountsController {
  constructor(private readonly sellerAccountsService: SellerAccountsService) {}

  @Post()
  create(@Body() createSellerAccountDto: CreateSellerAccountDto) {
    return this.sellerAccountsService.create(createSellerAccountDto);
  }

  @Get()
  findAll() {
    return this.sellerAccountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellerAccountsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSellerAccountDto: UpdateSellerAccountDto) {
    return this.sellerAccountsService.update(+id, updateSellerAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellerAccountsService.remove(+id);
  }
}
