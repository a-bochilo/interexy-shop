import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

// =========================== Api ===========================
import $api from "../../../api/api";

// =========================== Interfaces & DTO's ===========================
import { ProductDto } from "../types/product.dto";
import { ProductDetailsDto } from "../types/product-details.dto";

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
        } catch (e) {
            console.error(e);
            return rejectWithValue(e);
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
        } catch (e) {
            console.error(e);
            return rejectWithValue(e);
        }
    }
);
