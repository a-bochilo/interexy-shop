// ========================== types ==========================
import { UserRoles } from "./user-roles.type";

export interface UserAssignRoleDto {
  id: string;
  phone: string;
  email: string;
  password: string;
  roleId: number;
  roleType: UserRoles;
  isActive: boolean;
  details_id: string;
  created: number;
  updated: number;
  newRole: string;
}
