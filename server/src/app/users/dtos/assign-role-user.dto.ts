import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class AssignUserRoleDto {

    @ApiProperty({ 
        example: 'default_user', 
        description: 'Role name' 
    })
    @IsNotEmpty()
    readonly newRole: string;
}
