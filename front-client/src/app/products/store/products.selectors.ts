import { RootState } from "../../../store";

export const productsSelector = (state: RootState) => state.products.products;
export const filtredProductsSelector = (state: RootState) =>
    state.products.filtredProducts;

export const productDetailsSelector = (state: RootState) =>
    state.products.productDetails;

export const productsPendingSelector = (state: RootState) =>
    state.products.pending;
export const productsErrorsSelector = (state: RootState) =>
    state.products.errors;
