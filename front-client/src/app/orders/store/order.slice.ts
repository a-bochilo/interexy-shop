

// =========================== actions ==================================
import { createSlice } from "@reduxjs/toolkit";

// ====================== interfaces & DTOdto's =========================
import { OrderDto } from "../types/order.dto";

// =========================== actions ==================================
import { fetchCreateOrder, fetchOrderItems, fetchOrders } from "./orders.actions";
import { OrderItemDto } from "../types/order-item.dto";

type IInitialState = {
  orders: OrderDto[];
  orderItems: OrderItemDto[];
  pending: {
    orders: boolean;
    orderItems: boolean;
  };
  errors: {
    orders: string | null;
    orderItems: string | null;
  };
};

const initialState = {
  orders: [],
  orderItems: [],
  pending: {
    orders: false,
    orderItems: false,
  },
  errors: {
    orders: null,
    orderItems: null,
  },
} as IInitialState;

const ordersSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {
    clearErrors: (state) => {
      state.errors.orders = null;
      state.errors.orderItems = null;
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
      });

    builder
      .addCase(fetchOrderItems.pending, (state) => {
        state.pending.orders = true;
      })
      .addCase(fetchOrderItems.fulfilled, (state, action) => {
        state.pending.orders = false;
        state.orderItems = action.payload;
      })
      .addCase(fetchOrderItems.rejected, (state, action: any & { payload: any }) => {
        state.pending.orders = false;
        state.errors.orders = action.payload;
      });

    builder
      .addCase(fetchCreateOrder.pending, (state) => {
        state.pending.orders = true;
      })
      .addCase(fetchCreateOrder.fulfilled, (state, action) => {
        state.pending.orders = false;
        state.orderItems = action.payload;
      })
      .addCase(fetchCreateOrder.rejected, (state, action: any & { payload: any }) => {
        state.pending.orders = false;
        state.errors.orders = action.payload;
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = ordersSlice;
export default reducer;
export const { clearErrors } = actions;
