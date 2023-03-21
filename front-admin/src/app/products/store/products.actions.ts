import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

// =========================== Api ===========================
import $api from "../../../api/api";

// =========================== Interfaces & DTO's ===========================
import { ProductDto } from "../types/product.dto";

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
            console.log(e);
            return rejectWithValue(e);
        }
    }
);
