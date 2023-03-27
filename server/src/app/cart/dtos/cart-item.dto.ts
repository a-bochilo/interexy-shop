import {
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CartItemDto {
    @ApiProperty({
        description: "Item id",
    })
    @IsNotEmpty()
    @IsString()
    id!: string;

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
