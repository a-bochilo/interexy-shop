import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import $api from "../../../api/api";

// ====================== Interfaces & DTO's =========================
import { OrderDto } from "../types/order.dto";
import { OrderItemDto } from "../types/order-item.dto";
import { CartDto } from "../../cart/types/cart.dto";

export const fetchOrders = createAsyncThunk<OrderDto[]>(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<OrderDto[]> = await $api.get(`/orders/profile`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message as string);
    }
  }
);

export const fetchOrderItems = createAsyncThunk<OrderItemDto[], string>(
  "orders/fetchOrderItems",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<OrderItemDto[]> = await $api.get(
        `/orders/items/${orderId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message as string);
    }
  }
);

export const fetchCreateOrder = createAsyncThunk(
  "orders/fetchCreateOrder",
  async (cart: CartDto, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<OrderItemDto[]> = await $api.post(`/orders`, cart);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message as string);
    }
  }
);
