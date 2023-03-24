import $api from "../../../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface ISignUpTemplateDetails {
  firstname: string;
  middlename?: string;
  lastname: string;
}

export interface ISignUpTemplate {
  email: string;
  password: string;
  phone?: string;
  details: ISignUpTemplateDetails;
}

export interface ISignUpTemplateDetails {
  firstname: string;
  middlename?: string;
  lastname: string;
}

export interface ISignInTemplate {
  email: string;
  password: string;
}

export interface IToken {
  token: string;
}

export const fetchSignIn = createAsyncThunk(
  "auth/fetchSignIn",
  async (data: ISignInTemplate, { rejectWithValue }) => {
    try {
      const response = await $api.post(`/auth/signIn`, data);
      return response.data.token;
    } catch (error: any) {
      return rejectWithValue(error);
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
      return rejectWithValue(error);
    }
  }
);
