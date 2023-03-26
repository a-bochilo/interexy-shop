import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import $api from "../../../api/api";

// ====================== Interfaces & DTO's =========================
import { OrderDto } from "../types/order.dto";
import { OrderItemDto } from "../types/order-item.dto";


export const fetchOrders = createAsyncThunk<OrderDto[], string>(
    "orders/fetchOrders",
    async (user_id: string, { rejectWithValue }) => {
      try {
        const response: AxiosResponse<OrderDto[]> = await $api.get(`/orders/profile`, {
          params:{
            user_id
          }
        });
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error?.response?.data?.message as string);
      }
    }
  );


  export const fetchOrderItems = createAsyncThunk<OrderItemDto[], string>(
    "orders/fetchOrderItems",
    async(orderId: string, {rejectWithValue}) => {
      try {
        const response: AxiosResponse<OrderItemDto[]> = await $api.get(`/orders/items/${orderId}`);
        return response.data;
      } catch(error: any) {
        return rejectWithValue(error?.response?.data?.message as string);
      }
    }
  )