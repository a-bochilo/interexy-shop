// ========================== typeorm ====================================
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

// ========================== Entities ==========================
import { UUIDEntity } from "../../../shared/entities/uuid.entity";
import { ProductEntity } from "../../products/entities/product.entity";
import { OrderEntity } from "./order.entity";

// ========================== swagger ====================================
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "order_items" })
export class OrderItemEntity extends UUIDEntity {
    
  @ApiProperty({
    example: "Blue shirts",
    description: "Product name",
    required: true,
    default: 0,
  })
  @Column({ name: "product_name" })
  product_name!: string;

  @ApiProperty({
    example: "10",
    description: "Product price",
    required: true,
  })
  @Column({ name: "product_price" })
  product_price!: number;

  @ApiProperty({
    example: "12",
    description: "Product quantity",
    required: true,
  })
  @Column({ name: "product_quantity" })
  product_quantity!: number;

  @ApiProperty({
    example: "123",
    description: "product_id",
  })
  @Column({ name: "product_id" })
  product_id: string;

  @OneToOne(() => ProductEntity)
  @JoinColumn({ name: "product_id" })
  product: ProductEntity;

  @Column()
  order_id: string;

  @ManyToOne(() => OrderEntity, (item) => item.items)
  @JoinColumn({ name: "order_id", referencedColumnName: "id" })
  order?: OrderEntity;
}
