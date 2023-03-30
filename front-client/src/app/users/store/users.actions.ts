// ========================== redux ==========================
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

// ========================== types ==========================
import { UserDto } from "../../users/types/user-dto.type";
import { UserUpdateDto } from "../types/user-details-update.type";

// ========================== store ==========================
import $api from "../../../api/api";
import { UserDetailsDto } from "../types/user-details.type";
import { UserSessionDto } from "../types/user-session-dto";

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

export const updateUserDetails = createAsyncThunk<UserUpdateDto, UserUpdateDto>(
  "users/updateUserDetails",
  async (userData) => {
    try {
      const response = await $api.put(`/users/profile`, userData);
      return response.data;
    } catch (error: any) {
      return error.response?.data?.message as string;
    }
  }
);
