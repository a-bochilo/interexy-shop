// ========================== nest ==========================
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

// ========================== entities ==========================
import { UserEntity } from "app/users/entities/user.entity";
import { OrderItemsEntity } from "./order-items.entity";
import { UUIDEntity } from "shared/entities/uuid.entity";

@Entity({ name: "orders" })
export class OrderEntity extends UUIDEntity {
  @Column({ name: "user_id" })
  userId!: string;

  @Column({ name: "total" })
  total!: number;

  @Column({ name: "quantities" })
  quantities!: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: UserEntity;

  @OneToMany(() => OrderItemsEntity, (orderItem) => orderItem.id)
  orderItems: OrderItemsEntity[];
}
