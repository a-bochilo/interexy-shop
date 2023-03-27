import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

// =========================== Slices ===========================
import products from "./app/products/store/products.slice";
import cart from "./app/cart/store/cart.slice";
import orders from "./app/orders/store/order.slice";
import { authReducer } from "./app/auth/store/auth.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products,
    cart,
    orders,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
