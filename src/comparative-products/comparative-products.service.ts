import { Injectable } from '@nestjs/common';
import { CreateComparativeProductDto } from './dto/create-comparative-product.dto';
import { UpdateComparativeProductDto } from './dto/update-comparative-product.dto';

@Injectable()
export class ComparativeProductsService {
  create(createComparativeProductDto: CreateComparativeProductDto) {
    return 'This action adds a new comparativeProduct';
  }

  findAll() {
    return `This action returns all comparativeProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comparativeProduct`;
  }

  update(id: number, updateComparativeProductDto: UpdateComparativeProductDto) {
    return `This action updates a #${id} comparativeProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} comparativeProduct`;
  }
}
