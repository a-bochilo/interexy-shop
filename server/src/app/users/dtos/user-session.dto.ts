import {
    IsNotEmpty,
    IsEmail,
    IsString,
    IsNumber,
    IsArray,
    IsEnum,
} from "class-validator";

// ========================== Enums ==========================
import { UserPermissions } from "../../../shared/types/user-permissions.enum";
import { UserRoles } from "../../../shared/types/user-roles.enum";

// ========================== Entities & DTO's ==========================
import { UserEntity } from "../entities/user.entity";
import { UUIDDto } from "../../../shared/dtos/uuid.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UserSessionDto extends UUIDDto {
    
    @ApiProperty({
        description: "User email",
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "User role id",
    })
    @IsNotEmpty()
    @IsNumber()
    role_id: number;

    @ApiProperty({
        description: "User role type",
        enum: UserRoles,
    })
    @IsNotEmpty()
    @IsString()
    @IsEnum(UserRoles)
    role_type: UserRoles;

    @ApiProperty({
        description: "User permissions",
        enum: [UserPermissions],
    })
    @IsNotEmpty()
    @IsArray()
    @IsEnum(UserPermissions, { each: true })
    permissions: UserPermissions[];

    public static fromEntity(entity: UserEntity): UserSessionDto {
        const dto = new UserSessionDto();
        dto.id = entity.id;
        dto.created = entity.created.valueOf();
        dto.updated = entity.updated.valueOf();
        dto.email = entity.email;
        dto.role_id = entity.roleId;
        dto.role_type = entity.roleType;
        dto.permissions = entity.role.permissions;
        return dto;
    }

    public static fromJwt(dto: UserSessionDto): UserSessionDto {
        if (!dto) {
            return;
        }

        const outputDto = new UserSessionDto();
        outputDto.id = dto.id;
        outputDto.created = dto.created.valueOf();
        outputDto.updated = dto.updated.valueOf();
        outputDto.email = dto.email;
        outputDto.role_id = dto.role_id;
        outputDto.role_type = dto.role_type;
        outputDto.permissions = dto.permissions;
        return dto;
    }
}
