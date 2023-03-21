import { IsNotEmpty, IsEnum, IsArray } from "class-validator";

// ========================== Types ==========================
import { UserPermissions } from "../../../shared/types/user-permissions.enum";
import { UserRoles } from "../../../shared/types/user-roles.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {

    @ApiProperty({ example: "some role", description: 'Role name', required: true})
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({ example: 'admin', description: 'Role type', required: true})
    @IsNotEmpty()
    @IsEnum(UserRoles)
    readonly type: UserRoles;

    @ApiProperty({ example: "['getAllUsers', 'getUserDetails']", description: 'Role permissions', required: true})
    @IsNotEmpty()
    @IsArray()
    @IsEnum(UserPermissions, { each: true })
    readonly permissions: UserPermissions[];
}