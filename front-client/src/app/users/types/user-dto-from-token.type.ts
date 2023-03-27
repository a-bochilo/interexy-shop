// ========================== types ==========================
import { UUIDDto } from "../../../types/uuid-dto.type";
import { UserPermissions } from "./user-permissions.enum";
import { UserRoles } from "./user-roles.enum";

export interface UserFromTokenDto extends UUIDDto {
  phone: string;
  email: string;
  permissions: UserPermissions;
  roleId: number;
  roleType: UserRoles;
  exp: number;
  iat: number;
}
