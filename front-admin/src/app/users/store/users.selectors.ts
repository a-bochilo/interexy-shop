// ========================== store ==========================
import { RootState } from "../../../store";

export const usersSelector = (state: RootState) => state.users.users;
export const userInfoSelector = (state: RootState) => state.users.userInfo;
export const usersLoadingSelector = (state: RootState) => state.users.pending;
export const usersFetchErrorsSelector = (state: RootState) => state.users.errors;
