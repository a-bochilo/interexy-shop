import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { UUIDEntity } from "src/shared/entities/uuid.entity";

export class OrderItemDto extends UUIDEntity {
    @ApiProperty({ example: "Blue shirt", description: 'Product name', required: true})
    @IsNotEmpty()
    readonly product_name: string;

    @ApiProperty({ example: "12", description: 'Product price', required: true})
    @IsNotEmpty()
    readonly product_price: number;

    @ApiProperty({ example: "1", description: 'Product quantity', required: true})
    @IsNotEmpty()
    readonly product_quantity: number;

    readonly product_id: string;

    readonly order_id: string;
}