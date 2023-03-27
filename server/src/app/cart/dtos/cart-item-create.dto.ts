import {
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CartItemCreateDto {
    @ApiProperty({
        description: "Product id",
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    productId!: string;

    @ApiProperty({
        description: "Product quantity",
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    @IsPositive()
    quantity!: number;
}
