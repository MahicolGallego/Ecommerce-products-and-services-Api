import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ErrorManager } from 'src/common/exception-filters/error-manager.filter';
import { CreateProductVariantDto } from 'src/product-variants/dto/create-product-variant.dto';
import { ProductVariant } from 'src/product-variants/entities/product-variant.entity';
import { SearchCriteriaProductDto } from './dto/search-criteria-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private dataSource: DataSource,
  ) {}

  async create(
    seller_id: string,
    createProductDto: CreateProductDto,
  ): Promise<{ product: Product; product_variant: ProductVariant }> {
    try {
      createProductDto.name = createProductDto.name.trim().toLowerCase();
      const product = await this.productsRepository.findOne({
        where: { seller_id, name: createProductDto.name },
      });

      if (product) {
        throw new ErrorManager({
          type: 'CONFLICT',
          message: 'Product already exists',
        });
      }

      // execute inserts as a transaction
      let newProduct: Product;
      let newProductVariant: ProductVariant;

      await this.dataSource.manager.transaction(
        async (transactionalEntityManager) => {
          newProduct = await transactionalEntityManager.save(Product, {
            seller_id,
            name: createProductDto.name,
            description: createProductDto.description,
            reference: createProductDto.reference,
          });

          const productVariant: CreateProductVariantDto = {
            product_id: newProduct.id,
            size: createProductDto.size,
            color: createProductDto.color,
            price: createProductDto.price,
            stock: createProductDto.stock,
          };

          newProductVariant = await transactionalEntityManager.save(
            ProductVariant,
            productVariant,
          );
        },
      );

      return { product: newProduct, product_variant: newProductVariant };
    } catch (error) {
      console.log(error);
      if (error instanceof QueryFailedError)
        throw new ErrorManager({
          type: 'INTERNAL_SERVER_ERROR',
          message: 'Transaction failed',
        });

      throw error instanceof Error
        ? ErrorManager.createErrorSignature(error.message)
        : ErrorManager.createErrorSignature('An unexpected error occurred');
    }
  }

  findAll() {
    return `This action returns all products`;
  }

  async findOne(id: string, seller_id: string): Promise<Product> {
    return await this.productsRepository.findOne({ where: { id, seller_id } });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async findOneBy(searchCriteria: SearchCriteriaProductDto): Promise<Product> {
    return await this.productsRepository.findOneBy({
      ...searchCriteria,
      deleted_at: null,
    });
  }
}
