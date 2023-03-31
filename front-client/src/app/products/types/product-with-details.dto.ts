import { ProductDetailsDto } from "./product-details.dto";
import { ProductDto } from "./product.dto";

export interface ProductWithDetailsDto
  extends ProductDto,
    Omit<ProductDetailsDto, "id"> {}
