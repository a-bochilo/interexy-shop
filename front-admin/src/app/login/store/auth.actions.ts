import $api from "../../../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface ISignInTemplate {
  email: string;
  password: string;
}

export const fetchSignIn = createAsyncThunk<string, ISignInTemplate>(
  "auth/fetchSignIn",
  async (data: ISignInTemplate, { rejectWithValue }) => {
    try {
      const response = await $api.post(`/auth/signIn`, data);
      return response.data.token;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message as string);
    }
  }
);
