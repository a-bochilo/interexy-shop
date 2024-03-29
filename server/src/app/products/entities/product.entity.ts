import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";

// ========================== entities ==========================
import { UUIDEntity } from "../../../shared/entities/uuid.entity";
import { ProductDetailsEntity } from "./product-details.entity";

// ========================== enums ==========================
import { ProductsCategory } from "../enums/products-category.enum";

@Entity({ name: "products" })
export class ProductEntity extends UUIDEntity {
  @Index()
  @Column({ name: "category", enum: ProductsCategory })
  category!: ProductsCategory;

  @Column({ name: "name" })
  name!: string;

  @Column({ name: "brand" })
  brand!: string;

  @Column({ name: "price" })
  price!: number;

  @Column({ name: "image" })
  image!: string;

  @Column({ name: "is_active" })
  isActive!: boolean;

  @Column({ name: "quantity" })
  quantity!: number;

  @Column({ name: "product_details_id", type: "uuid" })
  productsDetailsId?: string;

  @OneToOne(() => ProductDetailsEntity)
  @JoinColumn({ name: "product_details_id", referencedColumnName: "id" })
  productDetails: ProductDetailsEntity;
}
