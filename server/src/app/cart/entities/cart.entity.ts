import {
    Column,
    Entity,
    Index,
    JoinColumn,
    OneToMany,
    OneToOne,
    RelationId,
} from "typeorm";

// ========================== Entities ==========================
import { UUIDEntity } from "../../../shared/entities/uuid.entity";
import { UserEntity } from "../../../app/users/entities/user.entity";
import { CartItemEntity } from "./cart-item.entity";

// ========================== Enums ==========================

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
