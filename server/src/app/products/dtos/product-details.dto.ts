import { IsNotEmpty, IsString } from "class-validator";

// ========================== swagger ==========================
import { ApiProperty } from "@nestjs/swagger";

// ========================== entities & dto's ==========================
import { UUIDDto } from "../../../shared/dtos/uuid.dto";
import { ProductDetailsEntity } from "../entities/product-details.entity";
import { ProductWithDetailsDto } from "./product-with-details.dto";
import { ProductOptionalDto } from "./products-optional.dto";

export class ProductDetailsDto extends UUIDDto {
  @ApiProperty({
    description: "Product color",
  })
  @IsNotEmpty()
  @IsString()
  color!: string;

  @ApiProperty({
    description: "Product material",
  })
  @IsNotEmpty()
  @IsString()
  material!: string;

  @ApiProperty({
    description: "Product size",
  })
  @IsNotEmpty()
  @IsString()
  size!: string;

  @ApiProperty({
    description: "Product description",
  })
  @IsNotEmpty()
  @IsString()
  description!: string;

  public static fromEntity(entity: ProductDetailsEntity): ProductDetailsDto {
    const dto = new ProductDetailsDto();
    dto.id = entity.id;
    dto.color = entity.color;
    dto.material = entity.material;
    dto.size = entity.size;
    dto.description = entity.description;

    return dto;
  }

  public static fromDto(
    incomingDto: ProductWithDetailsDto | ProductOptionalDto
  ): ProductDetailsDto {
    const dto = new ProductDetailsDto();

    incomingDto.color ? (dto.color = incomingDto.color) : null;
    incomingDto.material ? (dto.material = incomingDto.material) : null;
    incomingDto.size ? (dto.size = incomingDto.size) : null;
    incomingDto.description
      ? (dto.description = incomingDto.description)
      : null;
    return dto;
  }
}
