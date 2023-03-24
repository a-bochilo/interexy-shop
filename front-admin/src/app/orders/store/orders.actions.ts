import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import $api from "../../../api/api";

// ====================== Interfaces & DTO's =========================
import { OrderDto } from "../types/order.dto";



export const fetchOrders = createAsyncThunk<OrderDto[]>(
    "roles/fetchOrders",
    async (_, { rejectWithValue }) => {
      try {
        const response: AxiosResponse<OrderDto[]> = await $api.get(`/orders`);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error?.response?.data?.message as string);
      }
    }
  );