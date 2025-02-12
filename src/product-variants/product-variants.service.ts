import { Injectable } from '@nestjs/common';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductVariant } from './entities/product-variant.entity';
import { ProductsService } from 'src/products/products.service';
import { ErrorManager } from 'src/common/exception-filters/error-manager.filter';
import { SearchCriteriaProductVariantDto } from './dto/search-criteria-product-variant.dto';

@Injectable()
export class ProductVariantsService {
  constructor(
    @InjectRepository(ProductVariant)
    private readonly productVariantsRepository: Repository<ProductVariant>,
    private readonly productsService: ProductsService,
  ) {}

  async create(
    createProductVariantDto: CreateProductVariantDto,
    seller_id: string,
  ): Promise<ProductVariant> {
    try {
      const product = await this.productsService.findOne(
        createProductVariantDto.product_id,
        seller_id,
      );

      if (!product) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Product not found',
        });
      }

      return await this.productVariantsRepository.save(createProductVariantDto);
    } catch (error) {
      console.log(error);
      throw error instanceof Error
        ? ErrorManager.createErrorSignature(error.message)
        : ErrorManager.createErrorSignature('An unexpected error occurred');
    }
  }

  findAll() {
    return `This action returns all productVariants`;
  }

  update(id: number, updateProductVariantDto: UpdateProductVariantDto) {
    return `This action updates a #${id} productVariant`;
  }

  remove(id: number) {
    return `This action removes a #${id} productVariant`;
  }

  async findOneBy(
    searchCriteria: SearchCriteriaProductVariantDto,
  ): Promise<ProductVariant> {
    return await this.productVariantsRepository.findOneBy(searchCriteria);
  }
}
