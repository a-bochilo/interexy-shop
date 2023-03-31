// ========================== redux ==========================
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

// ========================== types ==========================
import { UserUpdateDto } from "../types/user-details-update.type";

// ========================== store ==========================
import $api from "../../../api/api";
import { UserDetailsDto } from "../types/user-details.type";

// ============ GET USER INFO ============ //
export const getUserInfo = createAsyncThunk(
  "users/getUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<UserDetailsDto> = await $api.get(
        `/users/profile`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message as string);
    }
  }
);

//============ UPDATE USER INFO ============
export const updateUserDetails = createAsyncThunk<UserUpdateDto, UserUpdateDto>(
  "users/updateUserDetails",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await $api.put(`/users/profile`, userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message as string);
    }
  }
);
