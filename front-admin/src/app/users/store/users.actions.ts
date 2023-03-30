// ========================== redux ==========================
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

// ========================== types ==========================
import { UserDto } from "../../users/types/user-dto.type";
import { UserDetailsDto } from "../types/user-details.type";
import { UserUpdateDto } from "../types/user-details-update.type";
import { UserAssignRoleDto } from "../types/user-assign-role-dto.type";

// ========================== store ==========================
import $api from "../../../api/api";
import { UserInfoUpdateDto } from "../types/user-info-update.type";

export const getUsers = createAsyncThunk<UserDto[]>(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await $api.get("/users");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message as string);
    }
  }
);

export const getAllUsers = createAsyncThunk<UserDto[], boolean>(
  "users/getAllUsers",
  async (isActive: boolean, { rejectWithValue }) => {
    try {
      const response = await $api.get<
        any,
        AxiosResponse<UserDto[], boolean>,
        any
      >("/users?isActive", { params: isActive });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message as string);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "users/getUserInfo",
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

export const updateUserInfo = createAsyncThunk<
  UserUpdateDto,
  UserInfoUpdateDto
>("users/updateUserInfo", async (userData) => {
  try {
    const response = await $api.put(`/users/${userData.id}`, userData);
    return response.data;
  } catch (error: any) {
    return error.response?.data?.message as string;
  }
});

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await $api.delete(`/users/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message as string);
    }
  }
);

export const assignRole = createAsyncThunk<
  UserAssignRoleDto,
  UserAssignRoleDto
>("users/assignRole", async (data) => {
  try {
    const newRole = {
      newRole: data.name,
    };
    const response = await $api.post(`/users/assignRole/${data.id}`, newRole);
    return response.data;
  } catch (error: any) {
    return error.response?.data?.message as string;
  }
});
