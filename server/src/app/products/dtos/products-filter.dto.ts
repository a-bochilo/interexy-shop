import { IsOptional, IsEnum, IsString, Matches } from "class-validator";

// ========================== swagger ==========================
import { ApiProperty } from "@nestjs/swagger";

// ========================== enums ==========================
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
  @IsString()
  brand?: string;

  @ApiProperty({
    description: "Product price",
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d*[1-9]\d*$/g)
  price?: string | number;

  @ApiProperty({
    description: "Product status",
  })
  @IsOptional()
  @IsString()
  @Matches(/true|false/i)
  isActive?: boolean | string;

  @ApiProperty({
    description: "Product quantity",
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d*[0-9]\d*$/g)
  quantity?: string | number;

  @ApiProperty({
    description: "Min product price",
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d*[0-9]\d*$/g)
  minPrice?: string;

  @ApiProperty({
    description: "Max product price",
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d*[1-9]\d*$/g)
  maxPrice?: string;

  @ApiProperty({
    description: "Min product quantity",
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d*[0-9]\d*$/g)
  minQuantity?: string;

  @ApiProperty({
    description: "Max product quantity",
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d*[1-9]\d*$/g)
  maxQuantity?: string;

  public static fromDto(incomingDto: ProductsFilterDto): ProductsFilterDto {
    const dto = new ProductsFilterDto();

    incomingDto.brand ? (dto.brand = incomingDto.brand) : null;
    incomingDto.category ? (dto.category = incomingDto.category) : null;
    incomingDto.isActive
      ? (dto.isActive = incomingDto.isActive === "true")
      : null;
    incomingDto.price ? (dto.price = +incomingDto.price) : null;
    incomingDto.quantity ? (dto.quantity = +incomingDto.quantity) : null;
    incomingDto.name ? (dto.name = incomingDto.name) : null;

    return dto;
  }
}
