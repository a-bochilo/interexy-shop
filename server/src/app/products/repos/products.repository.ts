import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, In, Repository } from "typeorm";

// ========================== Entities & DTO's ==========================
import { ProductEntity } from "../entities/product.entity";
import { ProductWithDetailsDto } from "../dtos/product-with-details.dto";

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>
  ) {}

  async getProductById(productId: string): Promise<ProductEntity> {
    return await this.productsRepository.findOne({
      where: { id: productId },
    });
  }

  async createProduct(
    productCreateDto: ProductWithDetailsDto
  ): Promise<ProductEntity> {
    const newProduct = new ProductEntity();

    Object.assign(newProduct, productCreateDto);
    newProduct.created = new Date();
    newProduct.updated = new Date();

    return await this.productsRepository.save(newProduct);
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.productsRepository.find();
  }

  async getInactiveProducts(): Promise<ProductEntity[]> {
    return await this.productsRepository.find({
      where: { isActive: false },
    });
  }

  async getFiltredProducts(
    productFilter: FindOptionsWhere<ProductEntity>
  ): Promise<ProductEntity[]> {
    return await this.productsRepository.find({
      where: productFilter,
    });
  }

  async getProductsByName(name: string): Promise<ProductEntity[]> {
    return await this.productsRepository.find({ where: { name } });
  }

  async updateProduct(product: ProductEntity): Promise<ProductEntity> {
    product.updated = new Date();
    return await this.productsRepository.save(product);
  }

  async getProductsArrayByIds(ids: string[]): Promise<ProductEntity[]> {
    return await this.productsRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async saveProductsArray(products: ProductEntity[]): Promise<ProductEntity[]> {
    return await this.productsRepository.save(products);
  }
}
