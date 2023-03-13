// ========================== nest ==========================
import { UUIDEntity } from "shared/entities/uuid.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({ name: "order-items" })
export class OrderItemsEntity extends UUIDEntity {
  @Column({ name: "product_id" })
  productId!: string;

  @Column({ name: "product_name" })
  productName!: string;

  @Column({ name: "product_price" })
  productPrice!: string;

  @Column({ name: "product_quantity" })
  productQuantity!: number;

  @OneToMany(() => Product, (product) => product.id)
  product: Product;
}
