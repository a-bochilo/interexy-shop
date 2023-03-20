import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// ========================== Entities & DTO's ==========================
import { ProductDetailsEntity } from "../entities/product-details.entity";
import { ProductDetailsDto } from "../dtos/product-details.dto";

@Injectable()
export class ProductsDetailsRepository {
    constructor(
        @InjectRepository(ProductDetailsEntity)
        private readonly productDetailsRepository: Repository<ProductDetailsEntity>
    ) {}

    async createProductDetails(
        productDetails: ProductDetailsDto | ProductDetailsEntity
    ): Promise<ProductDetailsEntity> {
        const newProductsDetails = new ProductDetailsEntity();

        Object.assign(newProductsDetails, productDetails);
        newProductsDetails.created = new Date();
        newProductsDetails.updated = new Date();

        return await this.productDetailsRepository.save(newProductsDetails);
    }

    async getProductDetailsById(
        detailsId: string
    ): Promise<ProductDetailsEntity> {
        return await this.productDetailsRepository.findOne({
            where: { id: detailsId },
        });
    }

    async updateProductDetails(
        productDetails: ProductDetailsEntity
    ): Promise<ProductDetailsEntity> {
        productDetails.updated = new Date();
        return await this.productDetailsRepository.save(productDetails);
    }
}
