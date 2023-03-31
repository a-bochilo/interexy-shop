import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FindOptionsWhere, Between, FindOperator } from "typeorm";
import { I18nContext } from "nestjs-i18n";

// ========================== entities ==========================
import { ProductEntity } from "./entities/product.entity";
import { ProductActiveViewEntity } from "./entities/product-active-view.entity";
import { ProductDetailsEntity } from "./entities/product-details.entity";

// ========================== repository ==========================
import { ProductsRepository } from "./repos/products.repository";
import { ProductsActiveViewRepository } from "./repos/products-active-view.repository";
import { ProductsDetailsRepository } from "./repos/product-details.repository";

// ========================== dto's ==========================
import { ProductWithDetailsDto } from "./dtos/product-with-details.dto";
import { ProductsQueryDto } from "./dtos/products-query.dto";
import { ProductsFilterDto } from "./dtos/products-filter.dto";
import { ProductOptionalDto } from "./dtos/products-optional.dto";
import { ProductDetailsDto } from "./dtos/product-details.dto";
import { ProductDto } from "./dtos/product.dto";

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly productsActiveViewRepository: ProductsActiveViewRepository,
    private readonly productsDetailsRepository: ProductsDetailsRepository
  ) {}

  async createProduct(
    productCreateDto: ProductWithDetailsDto
  ): Promise<ProductEntity> {
    const productByName = await this.productsRepository.getProductsByName(
      productCreateDto.name
    );

    if (productByName.length) {
      throw new HttpException(
        `${I18nContext.current().t("errors.products.productAlreadyExist")}: '${
          productCreateDto.name
        }'`,
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    if (productCreateDto.isActive === (null || undefined)) {
      productCreateDto.isActive = true;
    }

    const details = await this.productsDetailsRepository.createProductDetails(
      ProductDetailsDto.fromDto(productCreateDto)
    );

    return await this.productsRepository.createProduct(
      ProductDto.fromDto(productCreateDto),
      details
    );
  }

  async getActiveProducts(
    query: ProductsQueryDto = null
  ): Promise<ProductActiveViewEntity[]> {
    if (query?.category) {
      return await this.productsActiveViewRepository.getProductsInCategory(
        query.category
      );
    }

    return await this.productsActiveViewRepository.getAllProducts();
  }

  async getProductDetails(productId: string): Promise<ProductDetailsEntity> {
    let product: ProductEntity | ProductActiveViewEntity;

    product = await this.productsActiveViewRepository.getProductById(productId);

    if (!product)
      product = await this.productsRepository.getProductById(productId);

    if (!product) {
      throw new HttpException(
        I18nContext.current().t("errors.products.productDoesNotExist"),
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    return await this.productsDetailsRepository.getProductDetailsById(
      product.productsDetailsId
    );
  }

  async getFiltredProducts(
    filter: ProductsFilterDto
  ): Promise<(ProductEntity | ProductActiveViewEntity)[]> {
    const productFilter = this.removeEmptyFields(
      filter
    ) as FindOptionsWhere<ProductEntity>;

    productFilter.price =
      productFilter.price ||
      (Between(
        filter.minPrice ?? 0,
        filter.maxPrice ?? Number.MAX_SAFE_INTEGER
      ) as FindOperator<number>);
    productFilter.quantity =
      productFilter.quantity ||
      (Between(
        filter.minQuantity ?? 0,
        filter.maxQuantity ?? Number.MAX_SAFE_INTEGER
      ) as FindOperator<number>);

    if (productFilter.isActive === false) {
      return await this.productsRepository.getFiltredProducts(productFilter);
    }

    return await this.productsActiveViewRepository.getFiltredProducts(
      productFilter
    );
  }

  async updateProduct(
    productId: string,
    productUpdateDto: ProductOptionalDto
  ): Promise<ProductWithDetailsDto> {
    const productFromDB = await this.productsRepository.getProductById(
      productId
    );

    if (!productFromDB) {
      throw new HttpException(
        I18nContext.current().t("errors.products.productDoesNotExist"),
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    // === check if product with name supposed to be assigned already exists ===
    const productsByName = productUpdateDto.name
      ? await this.productsRepository.getProductsByName(productUpdateDto?.name)
      : null;
    if (
      productsByName?.length &&
      (productsByName.length > 1 || productsByName[0]?.id !== productId)
    ) {
      throw new HttpException(
        `${I18nContext.current().t("errors.products.productAlreadyExist")}: '${
          productUpdateDto.name
        }'`,
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const productDetailsFromDB =
      await this.productsDetailsRepository.getProductDetailsById(
        productFromDB.productsDetailsId
      );

    // ===== merge and save product details =====
    Object.assign(
      productDetailsFromDB,
      ProductDetailsDto.fromDto(productUpdateDto)
    );
    await this.productsDetailsRepository.updateProductDetails(
      productDetailsFromDB
    );

    const updatedProductDetails =
      await this.productsDetailsRepository.getProductDetailsById(
        productDetailsFromDB.id
      );

    Object.assign(productFromDB, ProductDto.fromDto(productUpdateDto));

    await this.productsRepository.updateProduct(productFromDB);

    const updatedProduct = await this.productsRepository.getProductById(
      productFromDB.id
    );

    const updatedDto = ProductWithDetailsDto.fromProductAndDetailsEntities({
      product: updatedProduct,
      productDetails: updatedProductDetails,
    });

    return updatedDto;
  }

  async deleteProduct(productId: string): Promise<ProductEntity> {
    const productFromDB = await this.productsRepository.getProductById(
      productId
    );

    if (!productFromDB) {
      throw new HttpException(
        I18nContext.current().t("errors.products.productDoesNotExist"),
        HttpStatus.BAD_REQUEST
      );
    }

    productFromDB.isActive = false;
    return await this.productsRepository.updateProduct(productFromDB);
  }

  private removeEmptyFields(obj: ProductsFilterDto) {
    const dto = ProductsFilterDto.fromDto(obj);

    const filterObj = Object.fromEntries(
      Object.entries(dto)
        .filter(([_, v]) => {
          if (v === null) return false;
          return v !== (null || undefined || "");
        })
        .map(([k, v]) => [k, v === Object(v) ? this.removeEmptyFields(v) : v])
    );

    return filterObj;
  }
}
