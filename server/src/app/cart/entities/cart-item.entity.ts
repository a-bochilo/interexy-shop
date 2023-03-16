import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";

// ========================== Entities ==========================
import { UUIDEntity } from "../../../shared/entities/uuid.entity";
import { CartEntity } from "./cart.entity";
import { ProudctEntity } from "../../../app/products/entities/product.entity";

@Entity({ name: "cart_items" })
export class CartItemEntity extends UUIDEntity {
    @Index()
    @Column({ name: "cart_id" })
    cart_id!: string;

    @Column({ name: "product_id" })
    product_id!: string;

    @Column({ name: "quantity" })
    quantity!: number;

    @ManyToOne(() => ProudctEntity, (product) => product.id)
    @JoinColumn({ name: "product_id", referencedColumnName: "id" })
    product: ProudctEntity;

    @ManyToOne(() => CartEntity, (cart) => cart.items)
    @JoinColumn({ name: "cart_id", referencedColumnName: "id" })
    cart!: CartEntity;
}
