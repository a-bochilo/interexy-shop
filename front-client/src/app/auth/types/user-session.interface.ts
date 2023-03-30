import { UserRoles } from "../../users/types/user-roles.enum";

export interface IUserSession {
  id: string;
  email: string;
  phone: string;
  created: number;
  updated: number;
  role_id: number;
  role_type: UserRoles;
}
