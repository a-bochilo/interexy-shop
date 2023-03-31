// =============================== enums ================================
import { UserPermissions } from "./user-permissions.enum";
import { UserRoles } from "./user-roles.enum";

export interface CreateRoleDto {
  type: UserRoles;
  name: string;
  permissions: UserPermissions[];
}
