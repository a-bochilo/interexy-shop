// ============================= enums =======================================
import { UserPermissions } from "./user-permissions.enum";
import { UserRoles } from "./user-roles.enum";

export interface RolesDto {
  created: string;
  updated: string;
  id: number;
  type: UserRoles;
  name: string;
  permissions: UserPermissions[] | null;
}
