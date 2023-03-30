import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

// =========================== Api ===========================
import $api from "../../../api/api";

// =========================== Interfaces & DTO's ===========================
import { CartDto, CartItemDto } from "../types/cart.dto";

export const fetchCart = createAsyncThunk<CartDto>(
    "cart/fetchCart",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await $api.get<
                any,
                AxiosResponse<CartDto, any>,
                any
            >("/cart");
            return data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.message as string);
        }
    }
);

export const addCartItem = createAsyncThunk<CartDto, CartItemDto>(
    "cart/addCartItem",
    async (item: CartItemDto, { rejectWithValue }) => {
        try {
            const { data } = await $api.post<
                any,
                AxiosResponse<CartDto, any>,
                any
            >("/cart", item);
            return data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.message as string);
        }
    }
);

export const updateCartItem = createAsyncThunk<CartDto, CartItemDto>(
    "cart/updateCartItem",
    async (item: CartItemDto, { rejectWithValue }) => {
        try {
            const { data } = await $api.put<
                any,
                AxiosResponse<CartDto, any>,
                any
            >("/cart", item);
            return data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.message as string);
        }
    }
);

export const clearCart = createAsyncThunk<CartDto>(
    "cart/clearCart",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await $api.delete<
                any,
                AxiosResponse<CartDto, any>,
                any
            >("/cart");
            return data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.message as string);
        }
    }
);

export const deleteCartItem = createAsyncThunk<CartDto, CartItemDto>(
    "cart/deleteCartItem",
    async (item: CartItemDto, { rejectWithValue }) => {
        try {
            const { data } = await $api.delete<
                any,
                AxiosResponse<CartDto, any>,
                any
            >(`/cart/${item.id}`);
            return data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.message as string);
        }
    }
);
