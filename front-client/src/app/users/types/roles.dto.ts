import { UserPermissions } from "./user-permissions.enum";
import { UserRoles } from "./user-roles.enum";


export interface RolesDto {
    id: number;
    type: UserRoles;
    name: string;
    permissions: UserPermissions[];
}