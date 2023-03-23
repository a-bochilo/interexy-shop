import { RootState } from "../../../store";


export const RolesSelector = (state: RootState) => state.roles.roles

export const ChosenRoleSelector = (state: RootState) => state.roles.chosenRole

export const getPendingSelector = (state: RootState) => state.roles.rolesFetchingStatus