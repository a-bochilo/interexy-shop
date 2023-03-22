import { AxiosResponse } from "axios";
// ========================== redux ==========================
import { createAsyncThunk } from "@reduxjs/toolkit";

// ========================== types ==========================
import { UserDto } from "../../users/types/user-dto.type";

// ========================== store ==========================
import $api from "../../../api/api";
import { UserDetailsDto } from "../types/user-details.type";

export const getUsers = createAsyncThunk<UserDto[]>(
  "GET/users",
  async (_, { rejectWithValue }) => {
    try {
      const response = await $api.get("/users");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message as string);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "GET/users/:userId",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<UserDetailsDto> = await $api.get(
        `/users/${userId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message as string);
    }
  }
);
