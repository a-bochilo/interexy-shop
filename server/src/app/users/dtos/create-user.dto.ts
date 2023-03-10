import { IsNotEmpty, IsEmail, IsString } from "class-validator";

// ========================== DTO's ==========================
import { UserDetailsDto } from "./user-details.dto";

// ========================== Entities ==========================
import { RoleEntity } from "src/app/roles/entities/role.entity";
import { UUIDDto } from "src/shared/dtos/uuid.dto";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    detailsId?: UserDetailsDto;

    role?: RoleEntity;

    roleId?: number;
}