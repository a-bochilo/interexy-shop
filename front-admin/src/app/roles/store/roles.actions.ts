// ====================== redux ======================================
import { createAsyncThunk } from "@reduxjs/toolkit";

// ====================== axios ======================================
import { AxiosResponse } from "axios";

// ====================== api ========================================
import $api from "../../../api/api";

// ====================== interfaces & dto's =========================
import { RolesDto } from "../types/roles.dto";
import { CreateRoleDto } from "../types/create-role.dto";

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

export const fetchRoleUpdate = createAsyncThunk<number, RolesDto>(
  "roles/fetchUpdateRole",
  async (data: RolesDto, { rejectWithValue }) => {
    try {
      const response = await $api.put(`/roles/${data.id}`, data);
      return response.status;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message as string);
    }
  }
);

export const fetchRoleDelete = createAsyncThunk<number, number>(
  "roles/fetchDeleteRole",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await $api.delete(`/roles/${id}`);
      return response.status;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message as string);
    }
  }
);

export const fetchRoleCreate = createAsyncThunk<number, CreateRoleDto>(
  "roles/fetchCreateRole",
  async (role: CreateRoleDto, { rejectWithValue }) => {
    try {
      const response = await $api.post(`/roles`, role);
      return response.status;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message as string);
    }
  }
);
