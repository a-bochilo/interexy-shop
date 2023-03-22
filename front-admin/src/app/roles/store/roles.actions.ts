import $api from "../../../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { RolesDto } from "../types/roles.dto";

export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<RolesDto[]> = await $api.get(`/roles`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message as string);
    }
  }
);

export const fetchCurrentRole = createAsyncThunk<RolesDto, string>(
  "roles/fetchCurrentRole",
  async (id: string, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<RolesDto> = await $api.get<
        any,
        AxiosResponse<RolesDto, any>,
        any
      >(`/roles/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message as string);
    }
  }
);
