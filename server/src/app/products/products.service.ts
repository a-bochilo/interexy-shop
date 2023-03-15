import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FindOptionsWhere, Between } from "typeorm";
import { omit } from "lodash";

// ========================== Entities ==========================
import { ProudctEntity } from "./entities/product.entity";
import { ProductActiveViewEntity } from "./entities/product-active-view.entity";
import { ProudctDetailsEntity } from "./entities/product-details.entity";

// ========================== Entities ==========================
import { ProductsRepository } from "./repos/products.repository";
import { ProductsActiveViewRepository } from "./repos/products-active-view.repository";
import { ProductsDetailsRepository } from "./repos/product-details.repository";

// ========================== DTO's & Enums ==========================
import { ProductWithDetailsDto } from "./dtos/product-with-details.dto";
import { ProductsQueryDto } from "./dtos/products-query.dto";
import { ProductsFilterDto } from "./dtos/products-filter.dto";
import { ProductOptionalDto } from "./dtos/products-optional.dto";

@Injectable()
export class ProductsService {
    constructor(
        private readonly productsRepository: ProductsRepository,
        private readonly productsActiveViewRepository: ProductsActiveViewRepository,
        private readonly productsDetailsRepository: ProductsDetailsRepository
    ) { }

    async createProduct(
        productCreateDto: ProductWithDetailsDto
    ): Promise<ProudctEntity> {
        try {
            const productByName = await this.productsRepository.getProductsByName(
                productCreateDto.name
            );

            if (productByName.length) {
                throw new HttpException(
                    `Product '${productCreateDto.name}' already exist`,
                    HttpStatus.UNPROCESSABLE_ENTITY
                );
            }

            if (productCreateDto.isActive === (null || undefined)) {
                productCreateDto.isActive = true;
            }

            const details =
                await this.productsDetailsRepository.createProductDetails(
                    productCreateDto.productDetails
                );

            return await this.productsRepository.createProduct({
                ...productCreateDto,
                productDetails: details,
            });
        } catch (error) {
            throw new HttpException(
                `${error}`,
                HttpStatus.BAD_REQUEST
            )
        }

    }

    async getActiveProducts(
        query: ProductsQueryDto = null
    ): Promise<ProductActiveViewEntity[]> {
        try {
            if (query.category) {
                return await this.productsActiveViewRepository.getProductsInCategory(
                    query.category
                );
            }

            return await this.productsActiveViewRepository.getAllProducts();
        } catch (error) {
            throw new HttpException(
                `${error}`,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async getProductDetails(productId: string): Promise<ProudctDetailsEntity> {
        try {
            const product = await this.productsActiveViewRepository.getProductById(
                productId
            );

            return await this.productsDetailsRepository.getProductDetailsById(
                product.productsDetailsId
            );
        } catch (error) {
            throw new HttpException(
                `${error}`,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async getFiltredProducts(
        filter: ProductsFilterDto
    ): Promise<(ProudctEntity | ProductActiveViewEntity)[]> {
        try {

            const productFilter = this.removeEmptyAndExtraFields(
                filter
            ) as FindOptionsWhere<ProudctEntity>;

            productFilter.price =
                productFilter.price ||
                Between(
                    filter.minPrice ?? 0,
                    filter.maxPrice ?? Number.MAX_SAFE_INTEGER
                );

            productFilter.quantity =
                productFilter.quantity ||
                Between(
                    filter.minQuantity ?? 0,
                    filter.maxQuantity ?? Number.MAX_SAFE_INTEGER
                );

            if (productFilter.isActive === false) {
                return await this.productsRepository.getFiltredProducts(
                    productFilter
                );
            }

            return await this.productsActiveViewRepository.getFiltredProducts(
                productFilter
            );
        } catch (error) {
            throw new HttpException(
                `${error}`,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async updateProduct(
        productId: string,
        productUpdateDto: ProductOptionalDto
    ): Promise<ProductWithDetailsDto> {
        try {
            const productFromDB = await this.productsRepository.getProductById(
                productId
            );

            const productsByName = await this.productsRepository.getProductsByName(
                productUpdateDto.name
            );

            if (
                productsByName.length > 1 ||
                (productsByName.length && productsByName[0]?.id !== productId)
            ) {
                throw new HttpException(
                    `Product '${productUpdateDto.name}' already exist`,
                    HttpStatus.UNPROCESSABLE_ENTITY
                );
            }

            const productDetailsFromDB =
                await this.productsDetailsRepository.getProductDetailsById(
                    productFromDB.productsDetailsId
                );

            Object.assign(productDetailsFromDB, productUpdateDto.productDetails);
            const updatedProductDetails =
                await this.productsDetailsRepository.updateProductDetails(
                    productDetailsFromDB
                );

            delete productUpdateDto.productDetails;

            Object.assign(productFromDB, productUpdateDto);
            const updatedProduct = await this.productsRepository.updateProduct(
                productFromDB
            );

            const updatedDto = ProductWithDetailsDto.fromProductAndDetailsEntities({
                product: updatedProduct,
                productDetails: updatedProductDetails,
            });

            return updatedDto;
        } catch (error) {
            throw new HttpException(
                `${error}`,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async deleteProduct(productId: string): Promise<ProudctEntity> {
        try {
            const productFromDB = await this.productsRepository.getProductById(
                productId
            );
            productFromDB.isActive = false;
            return await this.productsRepository.updateProduct(productFromDB);
        } catch (error) {
            throw new HttpException(
                `${error}`,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    private removeEmptyAndExtraFields(obj: ProductsFilterDto) {
        try {
            const filterObj = Object.fromEntries(
                Object.entries(obj)
                    .filter(([_, v]) => v !== (null || undefined))
                    .map(([k, v]) => [
                        k,
                        v === Object(v) ? this.removeEmptyAndExtraFields(v) : v,
                    ])
            );
            return omit(filterObj, [
                "minPrice",
                "maxPrice",
                "minQuantity",
                "maxQuantity",
            ]);
        } catch (error) {
            throw new HttpException(
                `${error}`,
                HttpStatus.BAD_REQUEST
            )
        }
    }
}
