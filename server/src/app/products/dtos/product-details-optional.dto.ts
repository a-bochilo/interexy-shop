import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ProductDetailsOptionalDto {
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
