// ========================== entities & dto's ===========================
import { UserEntity } from "../entities/user.entity";
import { UserDetailsDto } from "./user-details.dto";
import { UserDetailsEntity } from "../entities/user-details.entity";
import { UserSessionDto } from "./user-session.dto";

// ========================== swagger ====================================
import { ApiProperty, IntersectionType } from "@nestjs/swagger";

export class UserWithDetailsDto extends IntersectionType(
  UserSessionDto,
  UserDetailsDto
) {
  public static fromUserAndDetailsEntities({
    user,
    userDetails,
  }: {
    user: UserEntity;
    userDetails: UserDetailsEntity;
  }): UserWithDetailsDto {
    const dto = new UserWithDetailsDto();
    dto.password = user.password;
    dto.created = user.created.valueOf();
    dto.updated = user.updated.valueOf();
    dto.id = user.id;
    dto.email = user.email;
    dto.role_id = user.roleId;
    dto.role_type = user.roleType;
    dto.phone = user.phone;
    dto.isActive = user.isActive;
    dto.firstname = userDetails.firstname;
    dto.middlename = userDetails.middlename;
    dto.lastname = userDetails.lastname;
    return dto;
  }
}
