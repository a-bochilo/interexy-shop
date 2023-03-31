// =========================== interfaces ===========================
import { UUIDDto } from "../../../types/uuid-dto.type";

// =========================== enums ===========================
import { ProductsCategory } from "./products-category.enum";

export interface ProductDto extends UUIDDto {
  category: ProductsCategory;
  name: string;
  brand: string;
  price: number;
  image: string;
  isActive: boolean;
  quantity: number;
}
