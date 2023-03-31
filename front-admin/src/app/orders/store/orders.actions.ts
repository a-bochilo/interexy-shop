// ====================== redux ======================================
import { createAsyncThunk } from "@reduxjs/toolkit";

// ====================== axios ======================================
import { AxiosResponse } from "axios";

// ====================== api ========================================
import $api from "../../../api/api";

// ====================== interfaces & dto's =========================
import { OrderDto } from "../types/order.dto";
import { OrderItemDto } from "../types/order-item.dto";

export const fetchOrders = createAsyncThunk<OrderDto[]>(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<OrderDto[]> = await $api.get(`/orders`);
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
