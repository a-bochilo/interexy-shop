import { UserPermissions } from "./user-permissions.enum";
import { UserRoles } from "./user-roles.enum";


export interface RolesDto {
    id: string;
    type: UserRoles;
    name: string;
    permissions: UserPermissions[];
}