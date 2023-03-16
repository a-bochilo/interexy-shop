import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, In, Repository } from "typeorm";

// ========================== Entities & DTO's ==========================
import { ProudctEntity } from "../entities/product.entity";
import { ProductDetailsEntity } from "../entities/product-details.entity";
import { ProductDto } from "../dtos/product.dto";

@Injectable()
export class ProductsRepository {
    constructor(
        @InjectRepository(ProudctEntity)
        private readonly productsRepository: Repository<ProudctEntity>
    ) {}

    async getProductById(productId: string): Promise<ProudctEntity> {
        return await this.productsRepository.findOne({
            where: { id: productId },
        });
    }

    async createProduct(
        productDto: ProductDto,
        details: ProductDetailsEntity
    ): Promise<ProudctEntity> {
        const newProduct = new ProudctEntity();

        Object.assign(newProduct, productDto);
        newProduct.productDetails = details;
        newProduct.created = new Date();
        newProduct.updated = new Date();

        return await this.productsRepository.save(newProduct);
    }

    async getAllProducts(): Promise<ProudctEntity[]> {
        return await this.productsRepository.find();
    }

    async getInactiveProducts(): Promise<ProudctEntity[]> {
        return await this.productsRepository.find({
            where: { isActive: false },
        });
    }

    async getFiltredProducts(
        productFilter: FindOptionsWhere<ProudctEntity>
    ): Promise<ProudctEntity[]> {
        return await this.productsRepository.find({
            where: productFilter,
        });
    }

    async getProductsByName(name: string): Promise<ProudctEntity[]> {
        return await this.productsRepository.find({ where: { name } });
    }

    async updateProduct(product: ProudctEntity): Promise<ProudctEntity> {
        product.updated = new Date();
        return await this.productsRepository.save(product);
    }

    async getProductsArrayByIds(ids: string[]): Promise<ProudctEntity[]> {
        return await this.productsRepository.find({
            where: {
                id: In(ids),
            },
        });
    }

    async saveProductsArray(
        products: ProudctEntity[]
    ): Promise<ProudctEntity[]> {
        return await this.productsRepository.save(products);
    }
}
