// ========================== types ==========================
import { BaseState } from "../../../types/base-state.type";
import { UserDetailsDto } from "./user-details.type";
import { UserDto } from "./user-dto.type";

export interface UserState extends BaseState {
  user: UserDto | null;
  userInfo: UserDetailsDto | null;
  pending: {
    user: boolean;
    userInfo: boolean;
  };
  errors: {
    user: string | null;
    userInfo: string | null;
  };
}
