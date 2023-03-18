import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class AssignUserRoleDto {

    @ApiProperty({ 
        example: '1', 
        description: 'Role id' 
    })
    @IsNotEmpty()
    @IsNumber()
    readonly newRole: string;
}
