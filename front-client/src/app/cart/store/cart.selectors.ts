import { RootState } from "../../../store";

export const cartSelector = (state: RootState) => state.cart.cart;

export const cartPendingSelector = (state: RootState) => state.cart.pending;
export const cartErrorsSelector = (state: RootState) => state.cart.errors;
