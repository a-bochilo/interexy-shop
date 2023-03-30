import { RootState } from "../../../store";

export const userSelector = (state: RootState) => state.users.user;
export const userInfoSelector = (state: RootState) => state.users.userInfo;
export const userLoadingSelector = (state: RootState) => state.users.pending;
