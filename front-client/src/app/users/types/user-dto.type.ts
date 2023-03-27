// ========================== types ==========================
import { UUIDDto } from "../../../types/uuid-dto.type";
import { UserRoles } from "./user-roles.enum";

export interface UserDto extends UUIDDto {
  phone: string;
  email: string;
  password?: string;
  roleId: number;
  roleType: UserRoles;
  isActive?: boolean;
  details_id?: string;
}
