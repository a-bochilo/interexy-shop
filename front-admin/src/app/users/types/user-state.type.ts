import { UserDetailsDto } from './user-details.type';
// ========================== types ==========================
import { BaseState } from "../../../types/base-state.type";
import { UserDto } from "./user-dto.type";

export interface UserState extends BaseState {
  users: UserDto[];
  user: UserDetailsDto | null;
  pending: {
    users: boolean;
    user: boolean;
  };
  errors: {
    users: string | null;
    user: string | null;
  };
}
