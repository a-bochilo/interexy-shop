import { UserPermissions } from "./user-permissions.enum";
import { UserRoles } from "./user-roles.enum";


export interface RolesDto {
    id: string | undefined;
    type: UserRoles | undefined;
    name: string | undefined;
    permissions: UserPermissions[] | undefined;
}

export interface RolesTableDto {
    id: string | undefined;
    type: UserRoles | undefined;
    name: string | undefined;
    permissions: string | undefined;
}