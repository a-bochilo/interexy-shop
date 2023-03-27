import { user } from "./../../../../../server/src/app/orders/test/mocks/data.mock";
// ========================== react ==========================
import { decodeToken } from "react-jwt";

// ========================== redux ==========================
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ========================== types ==========================
import { UserState } from "../../users/types/user-state.type";
import { UserDto } from "../types/user-dto.type";
import { UserUpdateDto } from "../types/user-details-update.type";

// ========================== store ==========================
import { getUserInfo, updateUserDetails } from "./users.actions";
import { RootState } from "../../../store";
import { UserFromTokenDto } from "../types/user-dto-from-token.type";

const initialState: UserState = {
  user: null,
  userInfo: null,
  pending: {
    user: false,
    userInfo: false,
  },
  errors: {
    user: null,
    userInfo: null,
  },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // ============ GET USER ============ //
    getUser: (state) => {
      const token = window.localStorage.getItem("token");
      if (token) {
        const userFromToken: UserFromTokenDto | null = decodeToken(token);
        console.log(`userFromToken`, userFromToken);
        const user = {
          id: userFromToken?.id,
          phone: userFromToken?.phone,
          email: userFromToken?.email,
          created: userFromToken?.created,
          updated: userFromToken?.updated,
          roleId: userFromToken?.roleId,
          roleType: userFromToken?.roleType,
        };
        if (user !== null) {
          state.user = user as UserDto;
        }
      }
    },
  },
  extraReducers: (builder) => {
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

    //============ UPDATE USER INFO ============
    builder
      .addCase(updateUserDetails.pending, (state) => {
        state.pending.userInfo = true;
        state.errors.userInfo = null;
      })
      .addCase(
        updateUserDetails.fulfilled,
        (state, action: PayloadAction<UserUpdateDto>) => {
          state.user = action.payload;
        }
      )
      .addCase(
        updateUserDetails.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.userInfo = false;
          state.errors.userInfo = action.payload.message;
        }
      );
  },
});

export const usersActions = usersSlice.actions;
export default usersSlice.reducer;
