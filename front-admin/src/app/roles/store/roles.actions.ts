import $api from "../../../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { RolesDto } from "../types/roles.dto";

export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async (_, {rejectWithValue}) => {
    try{
      const response: AxiosResponse<RolesDto[]> = await $api.get(`/roles`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);

export const fetchCurrentRole = createAsyncThunk(
  "roles/fetchCurrentRole",
  async(id: string, {rejectWithValue}) => {
    try {
      const response: AxiosResponse<RolesDto> = await $api.get(`/roles/${id}`)
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)
