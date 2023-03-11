import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsEnum,
    IsBoolean,
    IsPositive,
    IsUrl,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

// ========================== Types ==========================
import { ProductsCategory } from "../enums/products-category.enum";

// ========================== Entities & DTO's ==========================
// import { ProudctEntity } from "../entities/product.entity";
import { ProudctDetailsEntity } from "../entities/product-details.entity";
import { UUIDDto } from "src/shared/dtos/uuid.dto";
import { ProductDetailsDto } from "src/app/products/dtos/product-details.dto";
import { ProudctEntity } from "../entities/product.entity";

export class ProductDto extends UUIDDto {
    @ApiProperty({
        description: "Product category",
        enum: ProductsCategory,
    })
    @IsNotEmpty()
    @IsString()
    @IsEnum(ProductsCategory)
    category!: ProductsCategory;

    @ApiProperty({
        description: "Product name",
    })
    @IsNotEmpty()
    @IsString()
    name!: string;

    @ApiProperty({
        description: "Product brand",
    })
    @IsNotEmpty()
    @IsString()
    brand!: string;

    @ApiProperty({
        description: "Product price",
    })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price!: number;

    @ApiProperty({
        description: "Product img url",
    })
    @IsNotEmpty()
    @IsString()
    @IsUrl()
    image!: string;

    @ApiProperty({
        description: "Product status",
    })
    isActive?: boolean;

    @ApiProperty({
        description: "Product quantity",
    })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    quantity!: number;

    productDetails: ProductDetailsDto | ProudctDetailsEntity;

    public static fromEntity(entity: ProudctEntity): ProductDto {
        const dto = new ProductDto();
        dto.id = entity.id;
        dto.created = entity.created.valueOf();
        dto.updated = entity.updated.valueOf();
        dto.category = entity.category;
        dto.name = entity.name;
        dto.brand = entity.brand;
        dto.price = entity.price;
        dto.image = entity.image;
        dto.quantity = entity.quantity;

        return dto;
    }
}
