import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

// ========================== Entities ==========================
import { UUIDEntity } from "../../../shared/entities/uuid.entity";
import { UserEntity } from "../../../app/users/entities/user.entity";
import { CartItemEntity } from "./cart-item.entity";

// ========================== Enums ==========================

@Entity({ name: "carts" })
export class CartEntity extends UUIDEntity {
    @Column({ name: "user_id" })
    userId!: string;

    @Column({ name: "cart_item_ids" })
    cartItemIds!: string;

    @OneToOne(() => UserEntity)
    @JoinColumn({ name: "user_id", referencedColumnName: "id" })
    user: UserEntity;

    @OneToMany(() => CartItemEntity, (item) => item.id)
    @JoinColumn({ name: "cart_item_ids", referencedColumnName: "id" })
    items: CartItemEntity[];
}
