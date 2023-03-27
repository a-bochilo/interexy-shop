import axios from "axios";
import { decodeToken } from "react-jwt";

const $api = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3001",
    "Content-type": "application/json",
  },
});

interface expireIn {
  exp: number | null;
}

$api.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

$api.interceptors.response.use(async (response) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const newUser: expireIn | null = decodeToken(token);
    if (newUser !== null && newUser.exp !== null) {
      const res = (newUser.exp - Date.now() / 1000) / 60;
      if (res <= 30) {
        localStorage.setItem(await $api.get("/auth/refresh-token"), "token");
      }
    }
  }
  return response;
});

export default $api;
