// ========================== common ==========================
import { UUIDEntity } from "shared/entities/uuid.entity";
import { Column, Entity, OneToMany } from "typeorm";

// ========================== entity ==========================
import { ProudctEntity } from "app/products/entities/product.entity";

@Entity({ name: "order-items" })
export class OrderItemsEntity extends UUIDEntity {
  @Column({ name: "product_id" })
  productId!: string;

  @Column({ name: "product_name" })
  productName!: string;

  @Column({ name: "product_price" })
  productPrice!: number;

  @Column({ name: "product_quantity" })
  productQuantity!: number;

  @OneToMany(() => ProudctEntity, (product) => product.id)
  product: ProudctEntity;
}
