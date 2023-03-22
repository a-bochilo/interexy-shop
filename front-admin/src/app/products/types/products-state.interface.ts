// =========================== Interfaces & DTO's ===========================
import { BaseState } from "../../../types/base-state.type";
import { ProductDetailsDto } from "./product-details.dto";
import { ProductDto } from "./product.dto";

export interface IProductsState extends BaseState {
    products: ProductDto[];
    product: ProductDetailsDto | undefined;
    pending: {
        products: boolean;
        product: boolean;
    };
    errors: {
        products: string | null;
        product: string | null;
    };
}
