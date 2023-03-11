import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

// ========================== Entities & Repositories ==========================
import { ProductsRepository } from "./repos/products.repository";
import { ProductsDetailsRepository } from "./repos/product-details.repository";
import { ProudctEntity } from "./entities/product.entity";
import { ProudctDetailsEntity } from "./entities/product-details.entity";

// ========================== Services ==========================

// ========================== DTO's & Types ==========================
import { ProductDto } from "./dtos/product.dto";

@Injectable()
export class ProductsService {
    constructor(
        private readonly productsRepository: ProductsRepository,
        private readonly productsDetailsRepository: ProductsDetailsRepository
    ) {}

    async createProduct(productDto: ProductDto): Promise<ProudctEntity> {
        const productByName = await this.productsRepository.getProductByName(
            productDto.name
        );

        if (productByName) {
            throw new HttpException(
                "Product already exist",
                HttpStatus.UNPROCESSABLE_ENTITY
            );
        }

        if (!productDto.isActive) {
            productDto.isActive = true;
        }

        const details =
            await this.productsDetailsRepository.createProductDetails(
                productDto.productDetails
            );

        return await this.productsRepository.createProduct({
            ...productDto,
            productDetails: details,
        });
    }

    async getAllProducts(): Promise<ProudctEntity[]> {
        return await this.productsRepository.getAllProducts();
    }

    async getProductDetails(productId: string): Promise<ProudctDetailsEntity> {
        const product = await this.productsRepository.getProductById(productId);

        return await this.productsDetailsRepository.getProductDetailsById(
            product.productsDetailsId
        );
    }
}
