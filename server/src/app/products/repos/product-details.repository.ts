import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// ========================== Entities & DTO's ==========================
import { ProudctDetailsEntity } from "../entities/product-details.entity";
import { ProductDetailsDto } from "../dtos/product-details.dto";

@Injectable()
export class ProductsDetailsRepository {
    constructor(
        @InjectRepository(ProudctDetailsEntity)
        private readonly productDetailsRepository: Repository<ProudctDetailsEntity>
    ) {}

    async createProductDetails(
        productDetails: ProductDetailsDto | ProudctDetailsEntity
    ): Promise<ProudctDetailsEntity> {
        const newProductsDetails = new ProudctDetailsEntity();

        Object.assign(newProductsDetails, productDetails);
        newProductsDetails.created = new Date();
        newProductsDetails.updated = new Date();

        return await this.productDetailsRepository.save(newProductsDetails);
    }

    async getProductDetailsById(
        detailsId: string
    ): Promise<ProudctDetailsEntity> {
        return await this.productDetailsRepository.findOne({
            where: { id: detailsId },
        });
    }
}
