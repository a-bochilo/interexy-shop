import { RootState } from "../../../store";


export const AuthSelector = (state: RootState) => state.auth.token;

export const AuthErrorSelector = (state: RootState) => state.auth.errors;