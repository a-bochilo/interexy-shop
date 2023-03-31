/* eslint-disable @typescript-eslint/no-unused-vars */
// ========================== redux =============================
import { createSlice } from "@reduxjs/toolkit";

// ========================== actions ===========================
import { fetchSignIn, fetchSignUp } from "./auth.actions";

type IInitialState = {
  token: string;
  errors: {
    token: string | null;
  };
  pending: {
    token: boolean;
  };
};

const initialState = {
  token: "",
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
      );

    builder
      .addCase(fetchSignUp.pending, (state) => {
        state.pending.token = false;
      })
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        state.pending.token = true;
        state.token = action.payload;
      })
      .addCase(
        fetchSignUp.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.token = false;
          state.token = "";
          state.errors.token = action.payload;
        }
      )
      .addDefaultCase(() => {});
  },
});
const { actions, reducer } = authSlice;
export default reducer;
export const { logout, clearErrors } = authSlice.actions;
export { fetchSignIn };
