import { RootState } from "../../../store";



export const OrdersSelector = (state: RootState) => state.orders.orders;

export const getPendingSelector = (state: RootState) => state.orders.pending;

export const getErrorSelector = (state: RootState) => state.orders.errors;