import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// =========================== Interfaces & DTO's ===========================
import { IProductsState } from "../types/products-state.interface";
import { ProductDto } from "../types/product.dto";
import { ProductDetailsDto } from "../types/product-details.dto";

// =========================== Actions ===========================
import { fetchProductDetials, fetchProducts } from "./products.actions";

const initialState: IProductsState = {
    products: [],
    product: undefined,
    pending: {
        products: false,
        product: false,
    },
    errors: {
        products: null,
        product: null,
    },
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        // setProductById: (state, action: PayloadAction<string>) => {
        //     state.product = state.products.find(
        //         (product) => product.id === action.payload
        //     );
        // },
    },
    extraReducers: (builder) => {
        // ================== Get products ==================
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.pending.products = true;
            })
            .addCase(
                fetchProducts.fulfilled,
                (state, action: PayloadAction<ProductDto[]>) => {
                    state.pending.products = false;
                    state.products = action.payload;
                }
            )
            .addCase(
                fetchProducts.rejected,
                (state, action: any & { payload: any }) => {
                    state.errors.products = action.payload?.message;
                }
            );
        builder
            .addCase(fetchProductDetials.pending, (state) => {
                state.pending.product = true;
            })
            .addCase(
                fetchProductDetials.fulfilled,
                (state, action: PayloadAction<ProductDetailsDto>) => {
                    state.pending.product = false;
                    state.product = action.payload;
                }
            )
            .addCase(
                fetchProductDetials.rejected,
                (state, action: any & { payload: any }) => {
                    state.errors.product = action.payload?.message;
                }
            );
    },
});

const { actions, reducer } = productsSlice;

export default reducer;

export const {
    // setProductById
} = actions;
