import {
    IsNumber,
    IsPositive,
    IsOptional,
    IsBoolean,
    IsEnum,
    IsString,
    IsUrl,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

// ========================== Enums ==========================
import { ProductsCategory } from "../enums/products-category.enum";

export class ProductsFilterDto {
    @ApiProperty({
        description: "Product category",
        enum: ProductsCategory,
    })
    @IsOptional()
    @IsString()
    @IsEnum(ProductsCategory)
    category?: ProductsCategory;

    @ApiProperty({
        description: "Product name",
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({
        description: "Product brand",
    })
    @IsOptional()
    @IsOptional()
    brand?: string;

    @ApiProperty({
        description: "Product price",
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    price?: number;

    @ApiProperty({
        description: "Product status",
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @ApiProperty({
        description: "Product quantity",
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    quantity?: number;

    @ApiProperty({
        description: "Min product price",
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    minPrice?: number;

    @ApiProperty({
        description: "Max product price",
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    maxPrice?: number;

    @ApiProperty({
        description: "Min product quantity",
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    minQuantity?: number;

    @ApiProperty({
        description: "Max product quantity",
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    maxQuantity?: number;

    public static fromDto(incomingDto: ProductsFilterDto): ProductsFilterDto {
        const dto = new ProductsFilterDto();
        dto.brand = incomingDto.brand;
        dto.category = incomingDto.category;
        dto.isActive = incomingDto.isActive;
        dto.price = incomingDto.price;
        // dto.maxPrice = incomingDto.maxPrice;
        // dto.minPrice = incomingDto.minPrice;
        dto.quantity = incomingDto.quantity;
        // dto.maxQuantity = incomingDto.maxQuantity;
        // dto.minQuantity = incomingDto.minQuantity;
        dto.name = incomingDto.name;

        return dto;
    }
}
