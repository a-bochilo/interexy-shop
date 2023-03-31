// ========================== api =============================
import $api from "../../../api/api";

// ========================== redux ===========================
import { createAsyncThunk } from "@reduxjs/toolkit";

// ========================== interfaces ======================
import { ISignInTemplate } from "../types/signIn.interface";
import { ISignUpTemplate } from "../types/signUp.interface";

export const fetchSignIn = createAsyncThunk(
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

export const fetchSignUp = createAsyncThunk(
  "auth/fetchSignUp",
  async (data: ISignUpTemplate, { rejectWithValue }) => {
    try {
      const response = await $api.post(`/auth/signUp`, data);
      return response.data.token;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message as string);
    }
  }
);
