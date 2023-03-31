// ========================== validator ==================================
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
  IsEnum,
} from "class-validator";

// ========================== enums ======================================
import { UserRoles } from "../../../shared/types/user-roles.enum";

// ========================== entities & dto's ===========================
import { UserEntity } from "../entities/user.entity";
import { UUIDDto } from "../../../shared/dtos/uuid.dto";
import { UserViewEntity } from "../entities/user-view.entity";

// ========================== swagger ====================================
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

  @ApiProperty({
    description: "User is Active",
  })
  @IsNotEmpty()
  @IsString()
  isActive: boolean;

  public static fromEntity(entity: UserEntity | UserViewEntity) {
    return {
      id: entity.id,
      email: entity.email,
      phone: entity.phone,
      created: entity.created.valueOf(),
      updated: entity.updated.valueOf(),
      role_id: entity.roleId,
      role_type: entity.roleType,
      isActive: entity.isActive,
    };
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
