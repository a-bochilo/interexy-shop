// ========================== types ==========================
import { UserRoles } from "./user-roles.type";

export interface UserInfoUpdateDto {
  id: string;
  email: string;
  phone: string;
  password: string;
  isActive: boolean;
  created: number;
  updated: number;
  roleType: UserRoles;
  roleId: number;
  details: {
    firstname: string;
    lastname: string;
    middlename: string;
  };

  details_id: string;
}
