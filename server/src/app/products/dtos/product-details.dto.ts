import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

// ========================== Entities & DTO's ==========================
import { UUIDDto } from "../../../shared/dtos/uuid.dto";
import { ProudctDetailsEntity } from "../entities/product-details.entity";

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

    public static fromEntity(entity: ProudctDetailsEntity): ProductDetailsDto {
        const dto = new ProductDetailsDto();
        dto.id = entity.id;
        dto.color = entity.color;
        dto.material = entity.material;
        dto.size = entity.size;
        dto.description = entity.description;

        return dto;
    }
}
