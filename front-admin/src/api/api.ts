import axios from "axios";
import { decodeToken } from "react-jwt";

const $api = axios.create({
    headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-type": "application/json",
    },
});

const $serviceApi = axios.create({
    headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-type": "application/json",
    },
});

$serviceApi.interceptors.request.use(
    async (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem(
            "token"
        )}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

interface expireIn {
    exp: number | null;
}

$api.interceptors.request.use(
    async (config) => {
        const token = window.localStorage.getItem("token");
        if (!token) return config;

        const decodedToken: expireIn | null = await decodeToken(token);
        if (!decodedToken || decodedToken.exp === null) return config;

        const res = (decodedToken.exp - Date.now() / 1000) / 60;

        if (res <= 0) localStorage.removeItem("token");

        if (res <= 30 && res > 0) {
            const newToken = await (
                await $serviceApi.get("/auth/refresh-token")
            ).data.token;
            localStorage.setItem("token", newToken);
        }

        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

$api.interceptors.response.use(
    async (response) => response,
    (error) => {
        if (error.response.status === 401) {
            window.location.replace("/auth/signIn");
        }
        return Promise.reject(error);
    }
);

export default $api;
