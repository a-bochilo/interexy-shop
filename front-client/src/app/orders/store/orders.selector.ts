import { RootState } from "../../../store";

export const OrdersSelector = (state: RootState) => state.orders.orders;

export const OrderItemsSelector = (state: RootState) => state.orders.orderItems;

export const getPendingSelector = (state: RootState) => state.orders.pending;

export const getErrorSelector = (state: RootState) => state.orders.errors;