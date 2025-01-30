import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComparativeProductsService } from './comparative-products.service';
import { CreateComparativeProductDto } from './dto/create-comparative-product.dto';
import { UpdateComparativeProductDto } from './dto/update-comparative-product.dto';

@Controller('comparative-products')
export class ComparativeProductsController {
  constructor(private readonly comparativeProductsService: ComparativeProductsService) {}

  @Post()
  create(@Body() createComparativeProductDto: CreateComparativeProductDto) {
    return this.comparativeProductsService.create(createComparativeProductDto);
  }

  @Get()
  findAll() {
    return this.comparativeProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comparativeProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComparativeProductDto: UpdateComparativeProductDto) {
    return this.comparativeProductsService.update(+id, updateComparativeProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comparativeProductsService.remove(+id);
  }
}
