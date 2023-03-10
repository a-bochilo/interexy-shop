import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// ========================== Entities & DTO's ==========================
import { ProudctEntity } from "../entities/product.entity";
import { ProductDto } from "../dtos/product.dto";

@Injectable()
export class ProductsRepository {
    constructor(
        @InjectRepository(ProudctEntity)
        private readonly productsRepository: Repository<ProudctEntity>
    ) {}

    async createProduct(product: ProductDto): Promise<ProudctEntity> {
        const newProduct = new ProudctEntity();

        Object.assign(newProduct, product);
        newProduct.created = new Date();
        newProduct.updated = new Date();

        return await this.productsRepository.save(newProduct);
    }

    async getAllProducts(): Promise<ProudctEntity[]> {
        return await this.productsRepository.find();
    }

    async getProductByName(name: string): Promise<ProudctEntity> {
        return await this.productsRepository.findOne({ where: { name } });
    }
}
