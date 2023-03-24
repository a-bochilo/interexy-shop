import { createSlice } from "@reduxjs/toolkit";

// ====================== Interfaces & DTO's =========================
import { OrderDto } from "../types/order.dto";

// =========================== Actions ===============================
import { fetchOrders } from "./orders.actions";

type IInitialState = {
  orders: OrderDto[];
  pending: {
    orders: boolean;
  };
  errors: {
    orders: string | null;
  };
};

const initialState = {
  orders: [],
  pending: {
    orders: false,
  },
  errors: {
    orders: null,
  },
} as IInitialState;

const ordersSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {
    clearErrors: (state) => {
      state.errors.orders = null;
    },
  },
  extraReducers: (builder) => {
    // ================== Get all orders ==================

    builder
      .addCase(fetchOrders.pending, (state) => {
        state.pending.orders = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.pending.orders = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action: any & { payload: any }) => {
        state.pending.orders = false;
        state.errors.orders = action.payload;
      })
      .addDefaultCase(() => {});
  },
});
const { actions, reducer } = ordersSlice;
export default reducer;
export const { clearErrors } = actions;
