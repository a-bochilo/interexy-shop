import { Column, Entity, Index } from "typeorm";

// ========================== entities ==========================
import { UUIDEntity } from "../../../shared/entities/uuid.entity";

@Entity({ name: "product_details" })
export class ProductDetailsEntity extends UUIDEntity {
  @Column({ name: "color" })
  color!: string;

  @Index()
  @Column({ name: "material" })
  material!: string;

  @Index()
  @Column({ name: "size" })
  size!: string;

  @Column({ name: "description" })
  description!: string;
}
