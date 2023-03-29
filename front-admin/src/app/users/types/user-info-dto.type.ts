// ========================== types ==========================
import { UUIDDto } from "../../../types/uuid-dto.type";
import { UserRoles } from "../../roles/types/user-roles.enum";
export interface UserInfoDto extends UUIDDto {
  phone: string;
  email: string;
  password: string;
  roleId: number;
  roleType: UserRoles;
  isActive: boolean;
  details_id: string;
}
