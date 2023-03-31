import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

// =========================== api ===========================
import $api from "../../../api/api";

// =========================== interfaces & dto's ===========================
import { ProductDto } from "../types/product.dto";
import { ProductDetailsDto } from "../types/product-details.dto";
import { ProductFilterDto } from "../types/product-filter.dto";
import { ProductsCategory } from "../types/products-category.enum";

export const fetchProducts = createAsyncThunk<ProductDto[]>(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await $api.get<
        any,
        AxiosResponse<ProductDto[], any>,
        any
      >("/products");
      return data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message as string);
    }
  }
);

export const fetchProductsInCategory = createAsyncThunk<
  ProductDto[],
  ProductsCategory
>(
  "products/fetchProductsInCategory",
  async (category: ProductsCategory, { rejectWithValue }) => {
    try {
      const { data } = await $api.get<
        any,
        AxiosResponse<ProductDto[], any>,
        any
      >(`/products?category=${category}`);
      return data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message as string);
    }
  }
);

export const fetchProductDetials = createAsyncThunk<ProductDetailsDto, string>(
  "products/fetchProductDetials",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await $api.get<
        any,
        AxiosResponse<ProductDetailsDto, any>,
        any
      >(`/products/${id}`);
      return data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message as string);
    }
  }
);

export const filterProduct = createAsyncThunk<ProductDto[], ProductFilterDto>(
  "products/filterProduct",
  async (product: ProductFilterDto, { rejectWithValue }) => {
    try {
      const { data } = await $api.get<
        any,
        AxiosResponse<ProductDto[], any>,
        any
      >("/products/filter", { params: product });
      return data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message as string);
    }
  }
);
