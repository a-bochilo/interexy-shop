import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";

// ========================== entities ==========================
import { UUIDEntity } from "../../../shared/entities/uuid.entity";
import { CartEntity } from "./cart.entity";

@Entity({ name: "cart_items" })
export class CartItemEntity extends UUIDEntity {
  @Index()
  @Column({ name: "cart_id" })
  cart_id!: string;

  @Index()
  @Column({ name: "product_id" })
  product_id!: string;

  @Column({ name: "quantity" })
  quantity!: number;

  @ManyToOne(() => CartEntity, (cart) => cart.items)
  @JoinColumn({ name: "cart_id", referencedColumnName: "id" })
  cart!: CartEntity;
}
