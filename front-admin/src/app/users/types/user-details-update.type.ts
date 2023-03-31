// ========================== types ==========================
import { UserRoles } from "./user-roles.type";

export interface UserUpdateDto {
  id: string;
  email: string;
  phone: string;
  password: string;
  isActive: boolean;
  created: number;
  updated: number;
  role_type: UserRoles;
  role_id: number;
  details: {
    firstname: string;
    lastname: string;
    middlename: string;
  };

  details_id: string;
}
