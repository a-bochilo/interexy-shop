// ========================== redux ==========================
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ========================== types ==========================
import { UserState } from "../../users/types/user-state.type";
import { UserDto } from "../types/user-dto.type";
import { UserUpdateDto } from "../types/user-details-update.type";

// ========================== store ==========================
import {
  getUsers,
  getAllUsers,
  getUserInfo,
  updateUserInfo,
  deleteUser,
  assignRole,
} from "./users.actions";

const initialState: UserState = {
  users: [],
  userInfo: null,
  newRole: null,
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

    // ============ GET ALL USERS ============ //
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.pending.users = true;
        state.errors.users = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.pending.users = false;
        state.users = action.payload;
      })
      .addCase(
        getAllUsers.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.users = false;
          state.errors.users = action.payload.message;
        }
      );

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

    // ============ UPDATE USER INFO ============ //
    builder
      .addCase(updateUserInfo.pending, (state) => {
        state.pending.userInfo = true;
        state.errors.userInfo = null;
      })
      .addCase(
        updateUserInfo.fulfilled,
        (state, action: PayloadAction<UserUpdateDto>) => {
          const users = state.users.filter(
            (user: UserDto) => user.id !== action.payload.id
          );
          const { details, ...user } = action.payload;

          users.push(user);
          state.users = users;
          if (!state.userInfo) return;
          state.userInfo = {
            ...state.userInfo,
            ...details,
          };
        }
      )
      .addCase(
        updateUserInfo.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.userInfo = false;
          state.errors.userInfo = action.payload.message;
        }
      );

    // ============ DELETE USER ============ //
    builder
      .addCase(deleteUser.pending, (state) => {
        state.pending.users = true;
        state.errors.users = null;
      })
      .addCase(
        deleteUser.fulfilled,
        (state, action: PayloadAction<UserUpdateDto>) => {
          const users = state.users.filter(
            (user: UserDto) => user.id !== action.payload.id
          );
          const { details, ...user } = action.payload;

          users.push(user);
          state.users = users;
          if (!state.userInfo) return;
          state.userInfo = {
            ...state.userInfo,
            ...details,
          };
        }
      )
      .addCase(deleteUser.rejected, (state, action: any & { payload: any }) => {
        state.pending.users = false;
        state.errors.users = action.payload.message;
      });

    // ============ ASSIGN ROLE ============ //
    builder
      .addCase(assignRole.pending, (state) => {
        state.pending.users = true;
        state.errors.users = null;
      })
      .addCase(assignRole.fulfilled, (state, action) => {
        state.newRole = action.payload;
      })
      .addCase(assignRole.rejected, (state, action: any & { payload: any }) => {
        state.pending.users = false;
        state.errors.users = action.payload.message;
      });
  },
});

export const usersActions = usersSlice.actions;
export default usersSlice.reducer;
