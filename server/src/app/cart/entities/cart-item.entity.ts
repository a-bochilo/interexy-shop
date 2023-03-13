import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";

// ========================== Entities ==========================
import { UUIDEntity } from "../../../shared/entities/uuid.entity";
import { ProudctEntity } from "../../../app/products/entities/product.entity";
import { CartEntity } from "./cart.entity";

@Entity({ name: "cart_items" })
export class CartItemEntity extends UUIDEntity {
    @Index()
    @Column({ name: "cart_id" })
    cart_id!: string;

    @Column({ name: "product_id" })
    product_id!: string;

    @Column({ name: "quantity" })
    quantity!: number;

    @ManyToOne(() => ProudctEntity)
    @JoinColumn({ name: "product_id", referencedColumnName: "id" })
    product: ProudctEntity;

    @ManyToOne(() => CartEntity)
    @JoinColumn({ name: "cart_id", referencedColumnName: "id" })
    cart: CartEntity;
}
