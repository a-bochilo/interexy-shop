import axios from "axios";

const $api = axios.create({
    headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-type": "application/json",
    },
});

// $api.interceptors.response.use((response) => {
//     if (response.status === 200) {
//         console.log("Api: fetched successful");
//     }
//     return response;
// });

export default $api;
