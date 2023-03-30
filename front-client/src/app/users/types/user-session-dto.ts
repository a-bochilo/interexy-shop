// ========================== types ==========================
import { UUIDDto } from "../../../types/uuid-dto.type";
import { UserPermissions } from "./user-permissions.enum";
import { UserRoles } from "./user-roles.enum";

export interface UserSessionDto extends UUIDDto {
  phone: string;
  email: string;
  role_id: number;
  role_type: UserRoles;
  permissions: UserPermissions[];
}
