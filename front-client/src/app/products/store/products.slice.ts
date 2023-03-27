import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// =========================== Interfaces & DTO's ===========================
import { IProductsState } from "../types/products-state.interface";
import { ProductDto } from "../types/product.dto";
import { ProductDetailsDto } from "../types/product-details.dto";

// =========================== Actions ===========================
import {
    fetchProductDetials,
    fetchProducts,
    fetchProductsInCategory,
    filterProduct,
} from "./products.actions";

const initialState: IProductsState = {
    products: [],
    filtredProducts: [],
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

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.errors.products = null;
            state.errors.productDetails = null;
        },
        setFiltredProducts: (state, action: PayloadAction<ProductDto[]>) => {
            state.filtredProducts = action.payload;
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
                    state.filtredProducts = action.payload;
                }
            )
            .addCase(
                fetchProducts.rejected,
                (state, action: any & { payload: any }) => {
                    state.pending.products = false;
                    state.errors.products = action.payload;
                }
            );
        // ================== Get products in category ==================
        builder
            .addCase(fetchProductsInCategory.pending, (state) => {
                state.pending.products = true;
            })
            .addCase(
                fetchProductsInCategory.fulfilled,
                (state, action: PayloadAction<ProductDto[]>) => {
                    state.pending.products = false;
                    state.errors.products = null;

                    state.products = action.payload;
                    state.filtredProducts = action.payload;
                }
            )
            .addCase(
                fetchProductsInCategory.rejected,
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

        // ================== Filter product ==================
        builder
            .addCase(filterProduct.pending, (state) => {
                state.pending.filter = true;
            })
            .addCase(
                filterProduct.fulfilled,
                (state, action: PayloadAction<ProductDto[]>) => {
                    state.pending.filter = false;

                    state.errors.filter = null;

                    state.filtredProducts = action.payload;
                }
            )
            .addCase(
                filterProduct.rejected,
                (state, action: any & { payload: any }) => {
                    state.pending.filter = false;

                    state.errors.filter = action.payload;
                }
            );
    },
});

const { actions, reducer } = productsSlice;

export default reducer;

export const { clearErrors, setFiltredProducts } = actions;
