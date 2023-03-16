import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsEnum,
    IsBoolean,
    IsPositive,
    IsUrl,
    IsOptional,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

// ========================== Types ==========================
import { ProductsCategory } from "../enums/products-category.enum";

// ========================== DTO's ==========================
import { UUIDDto } from "../../../shared/dtos/uuid.dto";
import { ProductWithDetailsDto } from "./product-with-details.dto";
import { ProductOptionalDto } from "./products-optional.dto";

// ========================== Entities ==========================
import { ProudctEntity } from "../entities/product.entity";
import { ProductActiveViewEntity } from "../entities/product-active-view.entity";

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
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @ApiProperty({
        description: "Product quantity",
    })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    quantity!: number;

    public static fromEntity(
        entity: ProudctEntity | ProductActiveViewEntity
    ): ProductDto {
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
        dto.isActive = entity.isActive;

        return dto;
    }

    public static fromDto(
        incomingDto: ProductWithDetailsDto | ProductOptionalDto
    ): ProductDto {
        const dto = new ProductDto();
        dto.category = incomingDto.category;
        dto.name = incomingDto.name;
        dto.brand = incomingDto.brand;
        dto.price = incomingDto.price;
        dto.image = incomingDto.image;
        dto.quantity = incomingDto.quantity;
        dto.isActive = incomingDto.isActive;

        return dto;
    }
}
