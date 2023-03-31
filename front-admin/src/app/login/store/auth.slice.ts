import { createSlice } from "@reduxjs/toolkit";
import { fetchSignIn } from "./auth.actions";

type IInitialState = {
  token: string | null;
  errors: {
    token: string | null;
  };
  pending: {
    token: boolean;
  };
};

const initialState = {
  token: null,
  errors: {
    token: null,
  },
  pending: {
    token: false,
  },
} as IInitialState;

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.token = "";
    },
    clearErrors: (state) => {
      state.errors.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchSignIn.pending, (state) => {
      state.pending.token = false;
    })
    .addCase(fetchSignIn.fulfilled, (state, action) => {
      state.pending.token = true;
      state.token = action.payload;
    })
    .addCase(
      fetchSignIn.rejected,
      (state, action: any & { payload: any }) => {
        state.pending.token = false;
        state.token = "";
        state.errors.token = action.payload;
      }
    )
      .addDefaultCase(() => {});
  },
});
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
export { fetchSignIn };
