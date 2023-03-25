// =========================== Interfaces & DTO's ===========================
import { BaseState } from "../../../types/base-state.type";

export interface ICartState extends BaseState {
    products: [];
    productDetails: undefined;
    pending: {
        products: boolean;
        productDetails: boolean;
        filter: boolean;
    };
    errors: {
        products: string | null;
        productDetails: string | null;
        filter: string | null;
    };
}
