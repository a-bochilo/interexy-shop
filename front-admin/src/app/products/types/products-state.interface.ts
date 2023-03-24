// =========================== Interfaces & DTO's ===========================
import { BaseState } from "../../../types/base-state.type";
import { ProductDetailsDto } from "./product-details.dto";
import { ProductDto } from "./product.dto";

export interface IProductsState extends BaseState {
    products: ProductDto[];
    productDetails: ProductDetailsDto | undefined;
    pending: {
        products: boolean;
        productDetails: boolean;
    };
    errors: {
        products: string | null;
        productDetails: string | null;
    };
}
