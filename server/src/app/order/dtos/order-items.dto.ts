// ========================== common ==========================
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsDate } from "class-validator";

// ========================== entities ==========================
import { OrderItemsEntity } from "../entities/order-items.entity";

export class OrderItemsDto {
  @ApiProperty({
    description: "Order id",
  })
  @IsString()
  @IsNotEmpty()
  id!: string;

  @ApiProperty({
    description: "Product name",
  })
  @IsString()
  @IsNotEmpty()
  productName!: string;

  @ApiProperty({
    description: "Product price",
  })
  @IsString()
  @IsNotEmpty()
  productPrice!: string;

  @ApiProperty({
    description: "Product quantity",
  })
  @IsNumber()
  @IsNotEmpty()
  productQuantity!: number;

  @ApiProperty({
    description: "Order created at",
  })
  @IsDate()
  @IsNotEmpty()
  created!: Date;

  @ApiProperty({
    description: "Order updated at",
  })
  @IsDate()
  @IsNotEmpty()
  updated!: Date;

  static fromEntity(entity: OrderItemsEntity) {
    const it = new OrderItemsDto();
    it.id = entity.id;
    it.productName = entity.productName;
    it.productPrice = entity.productPrice;
    it.productQuantity = entity.productQuantity;
    it.created = entity.created;
    it.updated = entity.updated;

    return it;
  }

  static fromEntities(entities: OrderItemsEntity[]) {
    return entities.map((entity) => this.fromEntity(entity));
  }
}
