import { IsString, IsEnum, IsOptional } from "class-validator";

// ========================== swagger ==========================
import { ApiProperty } from "@nestjs/swagger";

// ========================== types ==========================
import { ProductsCategory } from "../enums/products-category.enum";

export class ProductsQueryDto {
  @ApiProperty({
    description: "Product category",
    enum: ProductsCategory,
  })
  @IsOptional()
  @IsString()
  @IsEnum(ProductsCategory)
  category?: ProductsCategory;
}
