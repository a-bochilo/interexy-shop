import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";

// ========================== Entities & DTO's ==========================
import { ProductActiveViewEntity } from "../entities/product-active-view.entity";

// ========================== Enums ==========================
import { ProductsCategory } from "../enums/products-category.enum";

@Injectable()
export class ProductsActiveViewRepository {
    constructor(
        @InjectRepository(ProductActiveViewEntity)
        private readonly productsActiveViewRepository: Repository<ProductActiveViewEntity>
    ) {}

    async getProductById(productId: string): Promise<ProductActiveViewEntity> {
        return await this.productsActiveViewRepository.findOne({
            where: { id: productId },
        });
    }

    async getAllProducts(): Promise<ProductActiveViewEntity[]> {
        return await this.productsActiveViewRepository.find();
    }

    async getProductsInCategory(
        category: ProductsCategory
    ): Promise<ProductActiveViewEntity[]> {
        return await this.productsActiveViewRepository.find({
            where: { category },
        });
    }

    async getProductByName(name: string): Promise<ProductActiveViewEntity> {
        return await this.productsActiveViewRepository.findOne({
            where: { name },
        });
    }

    async getFiltredProducts(
        productFilter: FindOptionsWhere<ProductActiveViewEntity>
    ): Promise<ProductActiveViewEntity[]> {
        return await this.productsActiveViewRepository.find({
            where: productFilter,
        });
    }
}
