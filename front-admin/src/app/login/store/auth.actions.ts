import $api from "../../../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface ISignInTemplate {
  email: string;
  password: string;
}

export interface IToken {
  token: string;
}

export const fetchAuth = createAsyncThunk(
  "auth/fetchSignIn",
  async (data: ISignInTemplate) => {
    try {
      const response = await $api.post(`/auth/signIn`, data);
      if (response) {
        return response.data.token;
      } else {
        return console.error("custom error!!!");
      }
    } catch (error) {
      console.error(error);
    }
  }
);