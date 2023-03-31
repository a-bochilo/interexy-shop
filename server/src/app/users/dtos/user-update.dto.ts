// ========================== validator ==================================
import { IsEmail, IsString } from "class-validator";

// ========================== dto's ======================================
import { UserDetailsDto } from "./user-details.dto";

// ========================== entities ===================================
import { RoleEntity } from "../../roles/entities/role.entity";

// ========================== swagger ====================================
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty({
    example: "test@test.com",
    description: "Email",
    required: true,
  })
  @IsEmail(undefined, { message: "Uncorrect email" })
  readonly email?: string;

  @ApiProperty({
    example: "12345qwe678ad9",
    description: "Password",
    required: true,
  })
  readonly password?: string;

  @ApiProperty({
    example: "+375 (29) 111 11 11",
    description: "Phone",
    required: true,
  })
  @IsString()
  readonly phone?: string;

  details?: UserDetailsDto;
  readonly role?: RoleEntity;
  readonly roleId?: number;
  readonly details_id?: string;
}
