import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// =========================== Interfaces & DTO's ===========================
import { ICartState } from "../types/cart-state.interface";

// =========================== Actions ===========================
import {} from "./cart.actions";

const initialState: ICartState = {
    products: [],
    productDetails: undefined,
    pending: {
        products: false,
        productDetails: false,
        filter: false,
    },
    errors: {
        products: null,
        productDetails: null,
        filter: null,
    },
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.errors.products = null;
            state.errors.productDetails = null;
        },
    },
    extraReducers: (builder) => {
        // ================== Get cart ==================
        // builder
        //     .addCase(fetchProducts.pending, (state) => {
        //         state.pending.products = true;
        //     })
        //     .addCase(
        //         fetchProducts.fulfilled,
        //         (state, action: PayloadAction<ProductDto[]>) => {
        //             state.pending.products = false;
        //             state.errors.products = null;
        //             state.products = action.payload;
        //         }
        //     )
        //     .addCase(
        //         fetchProducts.rejected,
        //         (state, action: any & { payload: any }) => {
        //             state.pending.products = false;
        //             state.errors.products = action.payload;
        //         }
        //     );
        // ================== Get product details ==================
    },
});

const { actions, reducer } = cartSlice;

export default reducer;

export const { clearErrors } = actions;
