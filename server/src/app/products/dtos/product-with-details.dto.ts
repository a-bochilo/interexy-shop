// ========================== Entities ==========================
import { ProudctEntity } from "../entities/product.entity";
import { ProductDetailsEntity } from "../entities/product-details.entity";

// ========================== DTO's ==========================
import { ProductDto } from "./product.dto";
import { ProductDetailsDto } from "./product-details.dto";
import { IntersectionType } from "@nestjs/mapped-types";

export class ProductWithDetailsDto extends IntersectionType(
    ProductDto,
    ProductDetailsDto
) {
    public static fromProductAndDetailsEntities({
        product,
        productDetails,
    }: {
        product: ProudctEntity;
        productDetails: ProductDetailsEntity;
    }): ProductWithDetailsDto {
        const dto = new ProductWithDetailsDto();

        dto.id = product.id;
        dto.created = product.created.valueOf();
        dto.updated = product.updated.valueOf();
        dto.category = product.category;
        dto.name = product.name;
        dto.brand = product.brand;
        dto.price = product.price;
        dto.image = product.image;
        dto.quantity = product.quantity;
        dto.isActive = product.isActive;
        dto.color = productDetails.color;
        dto.material = productDetails.material;
        dto.size = productDetails.size;
        dto.description = productDetails.description;

        return dto;
    }
}
