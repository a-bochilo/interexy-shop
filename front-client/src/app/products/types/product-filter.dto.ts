import { ProductsCategory } from "./products-category.enum";

export interface ProductFilterDto {
  category?: ProductsCategory | null;
  name?: string | null;
  brand?: string | null;
  price?: number | null;
  isActive?: boolean | null;
  quantity?: number | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  minQuantity?: number | null;
  maxQuantity?: number | null;
}
