// ========================== redux ==========================
import { createSlice } from "@reduxjs/toolkit";

// ========================== types ==========================
import { UserState } from "../../users/types/user-state.type";

// ========================== store ==========================
import { getUsers, getUserInfo } from "./users.actions";

const initialState: UserState = {
  users: [],
  userInfo: null,
  pending: {
    users: false,
    userInfo: false,
  },
  errors: {
    users: null,
    userInfo: null,
  },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ============ GET USERS ============ //
      .addCase(getUsers.pending, (state) => {
        state.pending.users = true;
        state.errors.users = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.pending.users = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action: any & { payload: any }) => {
        state.pending.users = false;
        state.errors.users = action.payload.message;
      });
    // ============ GET USER INFO ============ //
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.pending.userInfo = true;
        state.errors.userInfo = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.pending.userInfo = false;
        state.userInfo = action.payload;
      })
      .addCase(
        getUserInfo.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.userInfo = false;
          state.errors.userInfo = action.payload.message;
        }
      );
  },
});

export const usersActions = usersSlice.actions;
export default usersSlice.reducer;
