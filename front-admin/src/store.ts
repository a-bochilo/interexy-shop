// ========================== redux ==========================
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./app/roles/store/roles.slice";

// ========================== store ==========================
import { usersSlice } from "./app/users/store/users.slice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

// =========================== Slices ===========================
import products from "./app/products/store/products.slice";

const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    roles: reducer,
    products,
  },
    
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
