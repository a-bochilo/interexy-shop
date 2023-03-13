import {
    IsString,
    IsNumber,
    IsEnum,
    IsBoolean,
    IsPositive,
    IsOptional,
    ValidateNested,
    IsUrl,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

// ========================== Types ==========================
import { ProductsCategory } from "../enums/products-category.enum";

// ========================== DTO's ==========================
import { ProductDetailsOptionalDto } from "./product-details-optional.dto";

export class ProductOptionalDto {
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
        description: "Product img url",
    })
    @IsOptional()
    @IsString()
    @IsUrl()
    image?: string;

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
        description: "Product details",
    })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ProductDetailsOptionalDto)
    productDetails?: ProductDetailsOptionalDto;
}
