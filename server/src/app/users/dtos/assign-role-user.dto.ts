import { IsNotEmpty, IsNumber } from "class-validator";

export class AssignUserRoleDto {
    @IsNotEmpty()
    @IsNumber()
    readonly newRole: number;
}
