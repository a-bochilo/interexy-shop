import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrentRole, fetchRoles } from "./roles.actions";
import { RolesDto } from "../types/roles.dto";

type IInitialState = {
  roles: RolesDto[];
  chosenRole: RolesDto | undefined;
  rolesFetchingStatus: "idle" | "loading" | "error";
};

const initialState = {
  roles: [],
  chosenRole: undefined,
  rolesFetchingStatus: "idle",
} as IInitialState;

const rolesSlice = createSlice({
  name: "roles",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.rolesFetchingStatus = "loading";
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.rolesFetchingStatus = "idle";
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state) => {
        state.rolesFetchingStatus = "error";
      });

    builder
      .addCase(fetchCurrentRole.pending, (state) => {
        state.rolesFetchingStatus = "loading";
      })
      .addCase(fetchCurrentRole.fulfilled, (state, action) => {
        state.rolesFetchingStatus = "idle";
        state.chosenRole = action.payload;
      })
      .addCase(fetchCurrentRole.rejected, (state) => {
        state.rolesFetchingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});
export const rolesReducer = rolesSlice.reducer;
export { fetchRoles };
