import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

// =========================== Slices ===========================
import products from "./app/products/store/products.slice";
import cart from "./app/cart/store/cart.slice";
import { authReducer } from "./app/login/store/auth.slice";
import { authReducer } from "./app/login/store/auth.slice";

const store = configureStore({
    reducer: {
      auth: authReducer,
      auth: authReducer,
        products,
        cart,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
