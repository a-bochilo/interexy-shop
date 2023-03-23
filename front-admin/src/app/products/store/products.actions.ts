import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

// =========================== Api ===========================
import $api from "../../../api/api";

// =========================== Interfaces & DTO's ===========================
import { ProductDto } from "../types/product.dto";
import { ProductDetailsDto } from "../types/product-details.dto";
import { ProductWithDetailsDto } from "../types/product-with-details.dto";

export const fetchProducts = createAsyncThunk<ProductDto[]>(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await $api.get<
                any,
                AxiosResponse<ProductDto[], any>,
                any
            >("products");
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
            >(`${id}`);
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
            >(`${id}`);
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
            >(`${product.id}`, product);
            return data;
        } catch (e: any) {
            console.error(e);
            return rejectWithValue(e.response?.data?.message as string);
        }
    }
);
