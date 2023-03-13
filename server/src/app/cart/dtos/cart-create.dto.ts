import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

// ========================== Types ==========================

// ========================== DTO's ==========================
import { UUIDDto } from "../../../shared/dtos/uuid.dto";

// ========================== Entities ==========================

export class CartCreateDto extends UUIDDto {
    @ApiProperty({
        description: "User id (cart owner)",
    })
    @IsNotEmpty()
    @IsString()
    userId!: string;
}
