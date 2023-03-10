import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

// ========================== Entities & DTO's ==========================
import { UUIDDto } from "src/shared/dtos/uuid.dto";

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
}
