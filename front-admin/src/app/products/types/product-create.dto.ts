import { ProductWithDetailsDto } from "./product-with-details.dto";

export interface ProductCreateDto
    extends Omit<ProductWithDetailsDto, "id" | "created" | "updated"> {}
