import { Column, Entity, OneToOne } from "typeorm";

// ========================== Entities ==========================
import { UUIDEntity } from "../../../shared/entities/uuid.entity";

@Entity({ name: "order_items" })
export class ProudctEntity extends UUIDEntity {

    @Column({ name: "name" })
    name!: string;

    @Column({ name: "price" })
    price!: number;

    @Column({ name: "is_active" })
    isActive!: boolean;

    @Column({ name: "quantity" })
    quantity!: number;

    @OneToOne(() => ProudctEntity)
    product_id: ProudctEntity;

}
