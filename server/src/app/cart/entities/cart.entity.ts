import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";

// ========================== entities ==========================
import { UUIDEntity } from "../../../shared/entities/uuid.entity";
import { UserEntity } from "../../../app/users/entities/user.entity";
import { CartItemEntity } from "./cart-item.entity";

@Entity({ name: "carts" })
export class CartEntity extends UUIDEntity {
  @Index()
  @Column({ name: "user_id", type: "uuid" })
  userId!: string;

  @OneToOne(() => UserEntity, (user) => user.cart)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: UserEntity;

  @OneToMany(() => CartItemEntity, (item) => item.cart)
  items: CartItemEntity[];
}
