import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./app/login/store/auth.slice";
import { rolesReducer } from "./app/roles/store/roles.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    roles: rolesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
