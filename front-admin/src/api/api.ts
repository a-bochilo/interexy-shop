import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL;

const $api = axios.create({
    headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    // baseURL: BASE_URL,
});

// $api.interceptors.response.use((response) => {
//     if (response.status === 200) {
//         console.log("Api: fetched successful");
//     }
//     return response;
// });

export default $api;
