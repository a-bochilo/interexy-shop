import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

// =========================== Slices ===========================
import { authReducer } from "./app/login/store/auth.slice";
import products from "./app/products/store/products.slice";
import roles from "./app/roles/store/roles.slice";
import orders from "./app/orders/store/order.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    roles,
    products,
    orders,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
