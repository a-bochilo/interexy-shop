import { createSlice } from "@reduxjs/toolkit";

// ====================== Interfaces & DTO's =========================
import { RolesDto } from "../types/roles.dto";

// =========================== Actions ===============================
import {
  fetchCurrentRole,
  fetchRoleCreate,
  fetchRoleDelete,
  fetchRoleUpdate,
  fetchRoles,
} from "./roles.actions";


type IInitialState = {
  roles: RolesDto[];
  chosenRole: RolesDto | undefined;
  pending: {
    roles: boolean;
    chosenRole: boolean;
  };
  errors: {
    roles: string | null;
    chosenRole: string | null;
  };
};

const initialState = {
  roles: [],
  chosenRole: undefined,
  pending: {
    roles: false,
    chosenRole: false,
  },
  errors: {
    roles: null,
    chosenRole: null,
  },
} as IInitialState;

const rolesSlice = createSlice({
  name: "roles",
  initialState: initialState,
  reducers: {
    clearErrors: (state) => {
      state.errors.roles = null;
      state.errors.chosenRole = null;
    },

    clearRole: (state) => {
      state.chosenRole = undefined;
    }
  },
  extraReducers: (builder) => {
    // ================== Get all roles ==================

    builder
      .addCase(fetchRoles.pending, (state) => {
        state.pending.roles = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.pending.roles = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action: any & { payload: any }) => {
        state.pending.roles = false;
        state.errors.roles = action.payload;
      });

    // =============== Get current role ================

    builder
      .addCase(fetchCurrentRole.pending, (state) => {
        state.pending.chosenRole = true;
      })
      .addCase(fetchCurrentRole.fulfilled, (state, action) => {
        state.pending.chosenRole = false;
        state.chosenRole = action.payload;
      })
      .addCase(fetchCurrentRole.rejected, (state, action: any & { payload: any }) => {
        state.pending.chosenRole = false;
        state.errors.chosenRole = action.payload;
      });

    // ================== Update role ==================

    builder
      .addCase(fetchRoleUpdate.pending, (state) => {
        state.pending.chosenRole = true;
      })
      .addCase(fetchRoleUpdate.fulfilled, (state, action) => {
        state.pending.chosenRole = false;
      })
      .addCase(fetchRoleUpdate.rejected, (state, action: any & { payload: any }) => {
        state.pending.chosenRole = false;
        state.errors.chosenRole = action.payload;
      });

// ================== Delete role ==================

    builder
      .addCase(fetchRoleDelete.pending, (state) => {
        state.pending.chosenRole = true;
      })
      .addCase(fetchRoleDelete.fulfilled, (state, action) => {
        state.pending.chosenRole = false;
      })
      .addCase(fetchRoleDelete.rejected, (state, action: any & { payload: any }) => {
        state.pending.chosenRole = false;
        state.errors.chosenRole = action.payload;
      });

// ================== Create role ==================

    builder
      .addCase(fetchRoleCreate.pending, (state) => {
        state.pending.chosenRole = true;
      })
      .addCase(fetchRoleCreate.fulfilled, (state, action) => {
        state.pending.chosenRole = false;
      })
      .addCase(fetchRoleCreate.rejected, (state, action: any & { payload: any }) => {
        state.pending.chosenRole = false;
        state.errors.chosenRole = action.payload;
      })

      .addDefaultCase(() => {});
  },
});
const { actions, reducer } = rolesSlice;
export default reducer;
export const { clearErrors, clearRole } = actions;
