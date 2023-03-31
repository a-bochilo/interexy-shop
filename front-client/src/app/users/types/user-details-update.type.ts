// ========================== enum ==========================
import { UserRoles } from "./user-roles.enum";

export interface UserUpdateDto {
  id: string;
  email: string;
  phone: string;
  password: string;
  details: {
    firstname: string;
    lastname: string;
    middlename: string;
  };
  card_id: string;
  created: number;
  updated: number;
  roleId: number;
  roleType: UserRoles;
  details_id: string;
  isActive: boolean;
}
