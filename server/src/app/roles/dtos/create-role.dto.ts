import { IsNotEmpty, IsEnum, IsArray } from "class-validator";

// ========================== Types ==========================
import { UserPermissions } from "src/shared/types/user-permissions.enum";
import { UserRoles } from "src/shared/types/user-roles.enum";

export class CreateRoleDto {
    @IsNotEmpty()
    @IsEnum(UserRoles)
    readonly type: UserRoles;

    @IsNotEmpty()
    @IsArray()
    @IsEnum(UserPermissions, { each: true })
    readonly permissions: UserPermissions[];
}