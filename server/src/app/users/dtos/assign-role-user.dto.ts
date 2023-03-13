import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { UserPermissions } from "src/shared/types/user-permissions.enum";

export class AssignUserRoleDto {

    @ApiProperty({ 
        example: '1', 
        description: 'Role id' 
    })
    @IsNotEmpty()
    @IsNumber()
    readonly newRole: number;

    @ApiProperty({
        description: "Product category",
        enum: UserPermissions,
    })
    @IsNotEmpty()
    @IsEnum(UserPermissions)
    readonly permissions: UserPermissions
}
