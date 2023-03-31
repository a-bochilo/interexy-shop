import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// =========================== interfaces & dto's ===========================
import { IProductsState } from "../types/products-state.interface";
import { ProductDto } from "../types/product.dto";
import { ProductDetailsDto } from "../types/product-details.dto";
import { ProductWithDetailsDto } from "../types/product-with-details.dto";

// =========================== actions ===========================
import {
  createProduct,
  deleteProduct,
  fetchProductDetials,
  fetchProducts,
  filterProduct,
  updateProduct,
} from "./products.actions";

// =========================== state ===========================
const initialState: IProductsState = {
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
    // ================== get products ==================
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
    // ================== get product details ==================
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
    // ================== delete product ==================
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
          state.pending.products = false;

          state.errors.products = action.payload;
        }
      );
    // ================== update product ==================
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
          state.pending.products = false;

          state.errors.products = action.payload;
        }
      );
    // ================== create product ==================
    builder
      .addCase(createProduct.pending, (state) => {
        state.pending.products = true;
      })
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<ProductDto>) => {
          state.pending.products = false;

          state.errors.products = null;

          state.products.push(action.payload);
        }
      )
      .addCase(
        createProduct.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.products = false;

          state.errors.products = action.payload;
        }
      );

    // ================== filter product ==================
    builder
      .addCase(filterProduct.pending, (state) => {
        state.pending.filter = true;
      })
      .addCase(
        filterProduct.fulfilled,
        (state, action: PayloadAction<ProductDto[]>) => {
          state.pending.filter = false;

          state.errors.filter = null;

          state.products = action.payload;
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

export const { clearErrors } = actions;
