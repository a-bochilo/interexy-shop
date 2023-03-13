import {
    IsNotEmpty,
    IsString,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

// ========================== Types ==========================

// ========================== DTO's ==========================
import { UUIDDto } from "src/shared/dtos/uuid.dto";

// ========================== Entities ==========================

export class CartDto extends UUIDDto {
    @ApiProperty({
        description: "User id (cart owner)",
    })
    @IsNotEmpty()
    @IsString()
    userId!: string;
}
