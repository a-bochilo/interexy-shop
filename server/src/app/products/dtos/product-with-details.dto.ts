import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

// ========================== Entities ==========================
import { ProudctEntity } from "../entities/product.entity";
import { ProductDetailsEntity } from "../entities/product-details.entity";

// ========================== DTO's ==========================
import { ProductDto } from "./product.dto";
import { ProductDetailsDto } from "./product-details.dto";

export class ProductWithDetailsDto extends ProductDto {
    @ApiProperty({
        description: "Product details",
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ProductDetailsDto)
    productDetails: ProductDetailsDto | ProductDetailsEntity;

    public static fromProductAndDetailsEntities({
        product,
        productDetails,
    }: {
        product: ProudctEntity;
        productDetails: ProductDetailsEntity;
    }): ProductWithDetailsDto {
        const detailsDto = ProductDetailsDto.fromEntity(productDetails);

        const dto = new ProductWithDetailsDto();
        const productDto = this.fromEntity(product);
        Object.assign(dto, productDto);

        dto.productDetails = detailsDto;

        return dto;
    }
}
