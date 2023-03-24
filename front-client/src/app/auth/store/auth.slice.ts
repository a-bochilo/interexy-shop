import { createSlice } from "@reduxjs/toolkit";
import { fetchSignIn } from "./auth.actions";

const initialState = {
  token: "",
  pending: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignIn.pending, (state) => {
        state.pending = false;
      })
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        state.pending = true;
        state.token = action.payload;
      })
      .addCase(fetchSignIn.rejected, (state) => {
        state.pending = false;
        state.token = "";
      })
      .addDefaultCase(() => {});
  },
});
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
