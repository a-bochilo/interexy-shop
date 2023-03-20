import {
    IsString,
    IsNumber,
    IsEnum,
    IsBoolean,
    IsPositive,
    IsOptional,
    IsUrl,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

// ========================== Enums ==========================
import { ProductsCategory } from "../enums/products-category.enum";

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
        description: "Product color",
    })
    @IsOptional()
    @IsString()
    color?: string;

    @ApiProperty({
        description: "Product material",
    })
    @IsOptional()
    @IsString()
    material?: string;

    @ApiProperty({
        description: "Product size",
    })
    @IsOptional()
    @IsString()
    size?: string;

    @ApiProperty({
        description: "Product description",
    })
    @IsOptional()
    @IsString()
    description?: string;
}
