import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// =========================== Interfaces & DTO's ===========================
import { IProductsState } from "../types/products-state.interface";
import { ProductDto } from "../types/product.dto";
import { ProductDetailsDto } from "../types/product-details.dto";
import { ProductWithDetailsDto } from "../types/product-with-details.dto";

// =========================== Actions ===========================
import {
    deleteProduct,
    fetchProductDetials,
    fetchProducts,
    updateProduct,
} from "./products.actions";

const initialState: IProductsState = {
    products: [],
    productDetails: undefined,
    pending: {
        products: false,
        productDetails: false,
    },
    errors: {
        products: null,
        productDetails: null,
    },
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.errors.products = null;
            state.errors.productDetails = null;
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
                    state.errors.products = null;

                    state.products = action.payload;
                }
            )
            .addCase(
                fetchProducts.rejected,
                (state, action: any & { payload: any }) => {
                    state.pending.products = false;
                    state.errors.products = action.payload;
                }
            );
        // ================== Get product details ==================
        builder
            .addCase(fetchProductDetials.pending, (state) => {
                state.pending.productDetails = true;
            })
            .addCase(
                fetchProductDetials.fulfilled,
                (state, action: PayloadAction<ProductDetailsDto>) => {
                    state.pending.productDetails = false;
                    state.errors.productDetails = null;

                    state.productDetails = action.payload;
                }
            )
            .addCase(
                fetchProductDetials.rejected,
                (state, action: any & { payload: any }) => {
                    state.pending.productDetails = false;

                    state.errors.productDetails = action.payload;
                }
            );
        // ================== Delete product ==================
        builder
            .addCase(deleteProduct.pending, (state) => {
                state.pending.products = true;
            })
            .addCase(
                deleteProduct.fulfilled,
                (state, action: PayloadAction<ProductDto>) => {
                    state.pending.products = false;

                    state.errors.products = null;

                    state.products = state.products.filter(
                        ({ id }) => id !== action.payload.id
                    );
                    state.productDetails = undefined;
                }
            )
            .addCase(
                deleteProduct.rejected,
                (state, action: any & { payload: any }) => {
                    console.log(action.payload);
                    state.pending.products = false;

                    state.errors.products = action.payload;
                }
            );
        // ================== Update product ==================
        builder
            .addCase(updateProduct.pending, (state) => {
                state.pending.products = true;
            })
            .addCase(
                updateProduct.fulfilled,
                (state, action: PayloadAction<ProductWithDetailsDto>) => {
                    state.pending.products = false;

                    state.errors.products = null;

                    const products = state.products.filter(
                        ({ id }) => id !== action.payload.id
                    );
                    const { color, material, size, description, ...product } =
                        action.payload;

                    products.push(product);
                    state.products = products;

                    if (!state.productDetails) return;
                    state.productDetails = {
                        ...state.productDetails,
                        color,
                        material,
                        size,
                        description,
                    };
                }
            )
            .addCase(
                updateProduct.rejected,
                (state, action: any & { payload: any }) => {
                    console.error(action.payload);
                    state.pending.products = false;

                    state.errors.products = action.payload;
                }
            );
    },
});

const { actions, reducer } = productsSlice;

export default reducer;

export const { clearErrors } = actions;
