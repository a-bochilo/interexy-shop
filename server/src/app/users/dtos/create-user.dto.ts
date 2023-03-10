import { IsNotEmpty, IsEmail, IsString } from "class-validator";

// ========================== DTO's ==========================
import { UserDetailsDto } from "./user-details.dto";

// ========================== Entities ==========================
import { RoleEntity } from "../../roles/entities/role.entity";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    phone: string;

    details: UserDetailsDto;

    role?: RoleEntity;

    roleId?: number;
}