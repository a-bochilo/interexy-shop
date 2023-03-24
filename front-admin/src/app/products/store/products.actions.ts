import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

// =========================== Api ===========================
import $api from "../../../api/api";

// =========================== Interfaces & DTO's ===========================
import { ProductDto } from "../types/product.dto";
import { ProductDetailsDto } from "../types/product-details.dto";
import { ProductWithDetailsDto } from "../types/product-with-details.dto";
import { ProductCreateDto } from "../types/product-create.dto";
import { ProductFilterDto } from "../types/product-filter.dto";

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
            console.error(e);
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
            console.error(e);
            return rejectWithValue(e.response?.data?.message as string);
        }
    }
);

export const deleteProduct = createAsyncThunk<ProductDto, string>(
    "products/deleteProduct",
    async (id: string, { rejectWithValue }) => {
        try {
            const { data } = await $api.delete<
                any,
                AxiosResponse<ProductDto, any>,
                any
            >(`/products/${id}`);
            return data;
        } catch (e: any) {
            console.error(e);
            return rejectWithValue(e.response?.data?.message as string);
        }
    }
);

export const updateProduct = createAsyncThunk<
    ProductWithDetailsDto,
    Partial<ProductWithDetailsDto>
>(
    "products/updateProduct",
    async (product: Partial<ProductWithDetailsDto>, { rejectWithValue }) => {
        try {
            const { data } = await $api.put<
                any,
                AxiosResponse<ProductWithDetailsDto, any>,
                any
            >(`/products/${product.id}`, product);
            return data;
        } catch (e: any) {
            console.error(e);
            return rejectWithValue(e.response?.data?.message as string);
        }
    }
);

export const createProduct = createAsyncThunk<ProductDto, ProductCreateDto>(
    "products/createProduct",
    async (product: ProductCreateDto, { rejectWithValue }) => {
        try {
            const { data } = await $api.post<
                any,
                AxiosResponse<ProductDto, any>,
                any
            >("/products", product);
            return data;
        } catch (e: any) {
            console.error(e);
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
            console.error(e);
            return rejectWithValue(e.response?.data?.message as string);
        }
    }
);
