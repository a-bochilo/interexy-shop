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
import { UserViewEntity } from "../entities/user-view.entity";
;
export class UserSessionDto extends UUIDDto {

    @ApiProperty({
        description: "User email",
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "User email",
    })
    @IsNotEmpty()
    @IsString()
    phone?: string;

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

    // @ApiProperty({
    //     description: "User permissions",
    //     enum: [UserPermissions],
    // })
    // @IsNotEmpty()
    // @IsArray()
    // @IsEnum(UserPermissions, { each: true })
    // permissions: UserPermissions[];

    public static fromEntity(entity: UserEntity | UserViewEntity) {
        return {
            id: entity.id,
            email: entity.email,
            phone: entity.phone,
            created: entity.created.valueOf(),
            updated: entity.updated.valueOf(),
            role_id: entity.roleId,
            role_type: entity.roleType,
        }
    }

    public static fromJwt(dto: UserSessionDto): UserSessionDto {
            if (!dto) {
                return;
            }
            const outputDto = new UserSessionDto();
            outputDto.id = dto.id;
            outputDto.email = dto.email;
            outputDto.role_id = dto.role_id;
            outputDto.role_type = dto.role_type;
            return dto;
    }
}
