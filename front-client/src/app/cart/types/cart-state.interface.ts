// =========================== Interfaces & DTO's ===========================
import { BaseState } from "../../../types/base-state.type";
import { CartDto } from "./cart.dto";

export interface ICartState extends BaseState {
    cart: CartDto | null;
    pending: {
        cart: boolean;
    };
    errors: {
        cart: string | null;
    };
}
