// ========================== redux ==========================
import { createSlice } from "@reduxjs/toolkit";

// ========================== types ==========================
import { UserState } from "../../users/types/user-state.type";

// ========================== store ==========================
import { getUsers } from "./users.actions";

const initialState: UserState = {
  users: [],
  user: null,
  pending: {
    users: false,
    user: false,
  },
  errors: {
    users: null,
    user: null,
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
        state.users.push(...action.payload);
      })
      .addCase(getUsers.rejected, (state, action: any & { payload: any }) => {
        state.pending.users = false;
        state.errors.users = action.payload.message;
      });
  },
});

export const usersActions = usersSlice.actions;
export default usersSlice.reducer;
