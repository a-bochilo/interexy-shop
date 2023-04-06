// ========================== validator ==================================
import { IsNotEmpty, IsEnum, IsArray } from "class-validator";

// ========================== enums ======================================
import { UserPermissions } from "../../../shared/types/user-permissions.enum";
import { UserRoles } from "../../../shared/types/user-roles.enum";

// ========================== swagger ====================================
import { ApiProperty } from "@nestjs/swagger";

// ========================== dto's ======================================
import { IDDto } from "../../../shared/dtos/id.dto";
import { RoleEntity } from "../entities/role.entity";

export class RoleDto extends IDDto {
  @ApiProperty({
    example: "some role",
    description: "Role name",
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "admin", description: "Role type", required: true })
  @IsNotEmpty()
  @IsEnum(UserRoles)
  type: UserRoles;

  @ApiProperty({
    example: "['getAllUsers', 'getUserDetails']",
    description: "Role permissions",
    required: true,
  })
  @IsNotEmpty()
  @IsArray()
  @IsEnum(UserPermissions, { each: true })
  permissions: UserPermissions[];

  static fromEntity(role: RoleEntity): RoleDto {
    const dto = new RoleDto();
    dto.id = role.id;
    dto.name = role.name;
    dto.permissions = role.permissions;
    dto.type = role.type;
    dto.created = role.created.valueOf();
    dto.updated = role.updated.valueOf();
    return dto;
  }
}
