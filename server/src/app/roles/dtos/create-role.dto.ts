import { IsNotEmpty, IsEnum, IsArray } from "class-validator";

// ========================== Types ==========================
import { UserPermissions } from "../../../shared/types/user-permissions.enum";
import { UserRoles } from "../../../shared/types/user-roles.enum";

export class CreateRoleDto {

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsEnum(UserRoles)
    readonly type: UserRoles;

    @IsNotEmpty()
    @IsArray()
    @IsEnum(UserPermissions, { each: true })
    readonly permissions: UserPermissions[];
}