import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// =========================== Interfaces & DTO's ===========================
import { IInitialState } from "../types/products-state.interface";
import { ProductDto } from "../types/product.dto";

// =========================== Actions ===========================
import { fetchProducts } from "./products.actions";

const initialState: IInitialState = {
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
        setProductById: (state, action: PayloadAction<string>) => {
            state.product = state.products.find(
                (product) => product.id === action.payload
            );
        },
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
    },
});

const { actions, reducer } = productsSlice;

export default reducer;

export const { setProductById } = actions;
