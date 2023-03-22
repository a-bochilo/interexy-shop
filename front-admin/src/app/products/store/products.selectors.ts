import { RootState } from "../../../store";

export const productsSelector = (state: RootState) => state.products.products;
export const productSelector = (state: RootState) => state.products.product;
export const productsPendingSelector = (state: RootState) =>
    state.products.pending;
