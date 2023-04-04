// ========================== swagger ====================================
import { ApiProperty } from "@nestjs/swagger";

// ========================== validator ==================================
import { IsNotEmpty } from "class-validator";

// ========================== entities ===================================
import { OrderItemEntity } from "../entities/order-item.entity";
import { UUIDDto } from "src/shared/dtos/uuid.dto";

export class OrderItemDto extends UUIDDto {
  @ApiProperty({
    example: "Blue shirt",
    description: "Product name",
    required: true,
  })
  @IsNotEmpty()
  product_name: string;

  @ApiProperty({ example: "12", description: "Product price", required: true })
  @IsNotEmpty()
  product_price: number;

  @ApiProperty({
    example: "1",
    description: "Product quantity",
    required: true,
  })
  @IsNotEmpty()
  product_quantity: number;

  product_id: string;

  order_id: string;

  static fromEntity(orderItem: OrderItemEntity): OrderItemDto {
    const dto = new OrderItemDto();
    dto.id = orderItem.id;
    dto.product_name = orderItem.product_name;
    dto.product_price = orderItem.product_price;
    dto.product_quantity = orderItem.product_price;
    dto.product_id = orderItem.product_id;
    dto.order_id = orderItem.order_id;
    dto.created = orderItem.created.valueOf();
    dto.updated = orderItem.updated.valueOf();
    return dto;
  }
}
