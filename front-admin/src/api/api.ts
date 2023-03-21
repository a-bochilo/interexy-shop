import axios from "axios";

const $api = axios.create({
  headers: {
    "Content-type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjljZTdiY2MxLWI1NTEtNDFlNy05N2UzLWVmZmYzYzJlOTY3MSIsImVtYWlsIjoic3VwZXJhZG1pbkBnbWFpbC5jb20iLCJwaG9uZSI6IiszNzUgMjkgMDAwIDAwIDAwIiwiY3JlYXRlZCI6MTY3OTM5NzYzODAwOSwidXBkYXRlZCI6MTY3OTM5NzYzODAwOSwicm9sZV9pZCI6MSwicm9sZV90eXBlIjoic3VwZXJhZG1pbiIsInBlcm1pc3Npb25zIjpbXSwiaWF0IjoxNjc5NDA5NDY1LCJleHAiOjE2Nzk0MTMwNjV9.BfoqpQv0LrS4EJM9QQ7DvxgoDW0F3wrLIYX_0ZVXfs4",
  },
});

// $api.interceptors.response.use((response) => {
//     if (response.status === 200) {
//         console.log("Api: fetched successful");
//     }
//     return response;
// });

export default $api;
