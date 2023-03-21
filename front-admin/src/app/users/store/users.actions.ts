// ========================== redux ==========================
import { Action, AsyncThunkAction, createAsyncThunk } from "@reduxjs/toolkit";

// ========================== types ==========================
import { UserDto } from "../../users/types/user-dto.type";

// ========================== store ==========================
import $api from "../../../api/api";

export const getUsers = createAsyncThunk<UserDto[]>(
  "GET/users",
  async (_, { rejectWithValue }) => {
    try {
      const response = await $api.get("/users");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getUser = createAsyncThunk<UserDto, { userId: string }>(
  "GET/users/:userId",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await $api.get(`/users/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
