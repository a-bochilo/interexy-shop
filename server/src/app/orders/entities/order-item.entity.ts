import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

// ========================== Entities ==========================
import { UUIDEntity } from "../../../shared/entities/uuid.entity";
import { ProductEntity } from "../../products/entities/product.entity";
import { OrderEntity } from "./order.entity";

@Entity({ name: "order_items" })
export class OrderItemEntity extends UUIDEntity {

    @Column({ name: "product_name" })
    product_name!: string;

    @Column({ name: "product_price" })
    product_price!: number;

    @Column({ name: "product_quantity" })
    product_quantity!: number;

    @Column({ name: 'product_id' })
    product_id: string

    @OneToOne(() => ProductEntity)
    @JoinColumn({ name: "product_id" })
    product: ProductEntity;

    @ManyToOne(() => OrderEntity, (item) => item.order_items)
    @JoinColumn({name: "order_id"})
    order: OrderEntity

}
