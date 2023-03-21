// ========================== types ==========================
import { UUIDDto } from "../../../types/uuid-dto.type";
import { UserRoles } from "../../roles/enums/user-roles.enum";
import { UserStatuses } from "../enums/user-statuses.enum";

export interface UserDto extends UUIDDto {
  phone: string;
  email: string;
  password: string;
  roleId: number;
  roleType: UserRoles;
  status: UserStatuses;
}
