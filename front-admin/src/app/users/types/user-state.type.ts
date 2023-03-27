import { UserDetailsDto } from "./user-details.type";
// ========================== types ==========================
import { BaseState } from "../../../types/base-state.type";
import { UserDto } from "./user-dto.type";
import { UserAssignRoleDto } from "./user-assign-role-dto.type";

export interface UserState extends BaseState {
  users: UserDto[];
  userInfo: UserDetailsDto | null;
  newRole: UserAssignRoleDto | null;
  pending: {
    users: boolean;
    userInfo: boolean;
  };
  errors: {
    users: string | null;
    userInfo: string | null;
  };
}
