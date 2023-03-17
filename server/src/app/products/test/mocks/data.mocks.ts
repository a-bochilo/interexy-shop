import { ProductWithDetailsDto } from "../../dtos/product-with-details.dto";
import { ProductDto } from "../../dtos/product.dto";
import { ProductDetailsEntity } from "../../entities/product-details.entity";
import { ProductEntity } from "../../entities/product.entity";
import { ProductsCategory } from "../../enums/products-category.enum";

const date = new Date();

export const productDetailsEntity = new ProductDetailsEntity();
productDetailsEntity.id = "fc8179a9-77db-4408-9239-b941226da8c5";
productDetailsEntity.created = date;
productDetailsEntity.updated = date;
productDetailsEntity.color = "red";
productDetailsEntity.material = "material";
productDetailsEntity.size = "size";
productDetailsEntity.description = "description";

export const productEntity = new ProductEntity();
productEntity.id = "fc8179a9-77db-4408-9239-b941226da8c5";
productEntity.created = date;
productEntity.updated = date;
productEntity.category = ProductsCategory.shirts;
productEntity.brand = "brand";
productEntity.image = "url.com";
productEntity.isActive = true;
productEntity.name = "name";
productEntity.price = 10;
productEntity.quantity = 100;
productEntity.productsDetailsId = productDetailsEntity.id;
productEntity.productDetails = productDetailsEntity;

export const productDto = ProductDto.fromEntity(productEntity);

export const productCreateDto =
    ProductWithDetailsDto.fromProductAndDetailsEntities({
        product: productEntity,
        productDetails: productDetailsEntity,
    });
