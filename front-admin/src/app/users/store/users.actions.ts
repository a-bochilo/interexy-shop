// ========================== redux ==========================
import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// ========================== types ==========================
import { UserDto } from "../../users/types/user-dto.type";
import { UserDetailsDto } from "../types/user-details.type";
import { UserUpdateDto } from "../types/user-details-update.type";

// ========================== store ==========================
import $api from "../../../api/api";

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

export const updateUserInfo = createAsyncThunk<UserUpdateDto, UserUpdateDto>(
  "PUT/users/:userId",
  async (userData) => {
    try {
      const response = await $api.put(`/users/${userData.id}`, userData);
      return response.data;
    } catch (error: any) {
      return error.response?.data?.message as string;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "DELETE/users/:userId",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await $api.delete(`/users/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message as string);
    }
  }
);

export const assignRole = createAsyncThunk<UserUpdateDto, UserUpdateDto>(
  "PUT/users/:userId",
  async (userData) => {
    try {
      const response = await $api.put(`/users/${userData.id}`, userData);
      return response.data;
    } catch (error: any) {
      return error.response?.data?.message as string;
    }
  }
);