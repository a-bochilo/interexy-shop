// =========================== Interfaces & DTO's ===========================
import { BaseState } from "../../../types/base-state.type";
import { ProductDto } from "./product.dto";

export interface IInitialState extends BaseState {
    products: ProductDto[];
    product: ProductDto | undefined;
    pending: {
        products: boolean;
        product: boolean;
    };
    errors: {
        products: string | null;
        product: string | null;
    };
}
