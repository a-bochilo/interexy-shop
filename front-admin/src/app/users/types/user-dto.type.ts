// ========================== types ==========================
import { UUIDDto } from "../../../types/uuid-dto.type";
import { UserRoles } from "../../roles/types/user-roles.enum";
export interface UserDto extends UUIDDto {
  phone: string;
  email: string;
  password: string;
  role_id: number;
  role_type: UserRoles;
  isActive: boolean;
  details_id: string;
}
