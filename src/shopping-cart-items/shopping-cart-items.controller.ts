import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShoppingCartItemsService } from './shopping-cart-items.service';
import { CreateShoppingCartItemDto } from './dto/create-shopping-cart-item.dto';
import { UpdateShoppingCartItemDto } from './dto/update-shopping-cart-item.dto';

@Controller('shopping-cart-items')
export class ShoppingCartItemsController {
  constructor(private readonly shoppingCartItemsService: ShoppingCartItemsService) {}

  @Post()
  create(@Body() createShoppingCartItemDto: CreateShoppingCartItemDto) {
    return this.shoppingCartItemsService.create(createShoppingCartItemDto);
  }

  @Get()
  findAll() {
    return this.shoppingCartItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shoppingCartItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShoppingCartItemDto: UpdateShoppingCartItemDto) {
    return this.shoppingCartItemsService.update(+id, updateShoppingCartItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shoppingCartItemsService.remove(+id);
  }
}
