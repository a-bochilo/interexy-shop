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

// ========================== swagger ==========================
import { ApiProperty } from "@nestjs/swagger";

// ========================== types ==========================
import { ProductsCategory } from "../enums/products-category.enum";

// ========================== dto's ==========================
import { UUIDDto } from "../../../shared/dtos/uuid.dto";
import { ProductWithDetailsDto } from "./product-with-details.dto";
import { ProductOptionalDto } from "./products-optional.dto";

// ========================== entities ==========================
import { ProductEntity } from "../entities/product.entity";
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
    entity: ProductEntity | ProductActiveViewEntity
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
    incomingDto.category ? (dto.category = incomingDto.category) : null;
    incomingDto.name ? (dto.name = incomingDto.name) : null;
    incomingDto.brand ? (dto.brand = incomingDto.brand) : null;
    incomingDto.price ? (dto.price = incomingDto.price) : null;
    incomingDto.image ? (dto.image = incomingDto.image) : null;
    incomingDto.quantity ? (dto.quantity = incomingDto.quantity) : null;
    incomingDto.isActive ? (dto.isActive = incomingDto.isActive) : null;

    return dto;
  }
}
