import { IsNumber, IsPositive, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

// ========================== DTO's ==========================
import { ProductOptionalDto } from "./products-optional.dto";

export class ProductsFilterDto extends ProductOptionalDto {
    @ApiProperty({
        description: "Min product price",
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    minPrice?: number;

    @ApiProperty({
        description: "Max product price",
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    maxPrice?: number;

    @ApiProperty({
        description: "Min product quantity",
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    minQuantity?: number;

    @ApiProperty({
        description: "Max product quantity",
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    maxQuantity?: number;
}
