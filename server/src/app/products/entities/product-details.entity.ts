import { Column, Entity } from "typeorm";

// ========================== Entities ==========================
import { UUIDEntity } from "../../../shared/entities/uuid.entity";

// ========================== Enums ==========================

@Entity({ name: "product_details" })
export class ProductDetailsEntity extends UUIDEntity {
    @Column({ name: "color" })
    color!: string;

    @Column({ name: "material" })
    material!: string;

    @Column({ name: "size" })
    size!: string;

    @Column({ name: "description" })
    description!: string;
}
