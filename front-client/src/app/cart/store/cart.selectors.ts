import { RootState } from "../../../store";

// export const productsSelector = (state: RootState) => state.products.products;

export const cartPendingSelector = (state: RootState) => state.products.pending;
export const cartErrorsSelector = (state: RootState) => state.products.errors;
