// ========================== redux ==========================
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

// ========================== types ==========================
import { UserDto } from "../../users/types/user-dto.type";
import { UserUpdateDto } from "../types/user-details-update.type";

// ========================== store ==========================
import $api from "../../../api/api";
import { UserDetailsDto } from "../types/user-details.type";

// export const getUsers = createAsyncThunk<UserDto[]>(
//   "GET/users",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await $api.get("/users");
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message as string);
//     }
//   }
// );

export const getUser = createAsyncThunk(
  "GET/users/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<UserDetailsDto> = await $api.get(`/users/profile`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message as string);
    }
  }
);

// export const updateUserInfo = createAsyncThunk<UserUpdateDto, UserUpdateDto>(
//   "PUT/users/:userId",
//   async (userData) => {
//     try {
//       const response = await $api.put(`/users/${userData.id}`, userData);
//       return response.data;
//     } catch (error: any) {
//       return error.response?.data?.message as string;
//     }
//   }
// );
