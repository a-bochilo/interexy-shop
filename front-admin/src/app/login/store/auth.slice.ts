import { createSlice } from "@reduxjs/toolkit";
import { fetchAuth } from "./auth.actions";


const initialState = {
    token: "",
    authFetchingStatus: "loading",
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAuth.pending, (state) => {
            state.authFetchingStatus = "loading";
        })
        .addCase(fetchAuth.fulfilled, (state, action) => {
            state.authFetchingStatus = "idle";
            state.token = action.payload;
        })
        .addCase(fetchAuth.rejected, (state) => {
            state.authFetchingStatus = "error";
        })
        .addDefaultCase(() => {});
    }
})
export const authReducer = authSlice.reducer;
export { fetchAuth };

