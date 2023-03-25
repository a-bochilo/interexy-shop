// ========================== redux ==========================
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ========================== types ==========================
import { UserState } from "../../users/types/user-state.type";
import { UserDto } from "../types/user-dto.type";
import { UserUpdateDto } from "../types/user-details-update.type";

// ========================== store ==========================
import {  getUser } from "./users.actions";

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
    // builder
      // // ============ GET USERS ============ //
      // .addCase(getUsers.pending, (state) => {
      //   state.pending.users = true;
      //   state.errors.users = null;
      // })
      // .addCase(getUsers.fulfilled, (state, action) => {
      //   state.pending.users = false;
      //   state.users = action.payload;
      // })
      // .addCase(getUsers.rejected, (state, action: any & { payload: any }) => {
      //   state.pending.users = false;
      //   state.errors.users = action.payload.message;
      // });

    // ============ GET USER ============ //
    builder
      .addCase(getUser.pending, (state) => {
        state.pending.user = true;
        state.errors.user = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.pending.user = false;
        state.user = action.payload;
        console.log(action.payload)
      })
      .addCase(getUser.rejected, (state, action: any & { payload: any }) => {
        state.pending.user = false;
        state.errors.user = action.payload.message;
      });

    // // ============ UPDATE USER INFO ============ //
    // builder
    //   .addCase(updateUserInfo.pending, (state) => {
    //     state.pending.userInfo = true;
    //     state.errors.userInfo = null;
    //   })
    //   .addCase(
    //     updateUserInfo.fulfilled,
    //     (state, action: PayloadAction<UserUpdateDto>) => {
    //       const users = state.users.filter(
    //         (user: UserDto) => user.id !== action.payload.id
    //       );
    //       const { details, ...user } = action.payload;

    //       users.push(user);
    //       state.users = users;
    //       if (!state.userInfo) return;
    //       state.userInfo = {
    //         ...state.userInfo,
    //         ...details,
    //       };
    //     }
    //   )
    //   .addCase(
    //     updateUserInfo.rejected,
    //     (state, action: any & { payload: any }) => {
    //       state.pending.userInfo = false;
    //       state.errors.userInfo = action.payload.message;
    //     }
    //   );
  },
});

export const usersActions = usersSlice.actions;
export default usersSlice.reducer;
