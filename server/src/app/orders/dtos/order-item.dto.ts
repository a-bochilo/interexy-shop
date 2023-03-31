// ========================== swagger ====================================
import { ApiProperty } from "@nestjs/swagger";

// ========================== validator ==================================
import { IsNotEmpty } from "class-validator";

// ========================== entities ===================================
import { UUIDEntity } from "../../../shared/entities/uuid.entity";

export class OrderItemDto extends UUIDEntity {
  @ApiProperty({
    example: "Blue shirt",
    description: "Product name",
    required: true,
  })
  @IsNotEmpty()
  readonly product_name: string;

  @ApiProperty({ example: "12", description: "Product price", required: true })
  @IsNotEmpty()
  readonly product_price: number;

  @ApiProperty({
    example: "1",
    description: "Product quantity",
    required: true,
  })
  @IsNotEmpty()
  readonly product_quantity: number;

  readonly product_id: string;

  readonly order_id: string;
}
