// ========================== validator ==================================
import { IsEmail, IsString, Length } from "class-validator";

// ========================== dto's ======================================
import { UserDetailsDto } from "./user-details.dto";

// ========================== entities ===================================
import { RoleEntity } from "../../roles/entities/role.entity";

// ========================== swagger ====================================
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    example: "test@test.com",
    description: "Email",
    required: true,
  })
  @IsEmail(undefined, { message: "Uncorrect email" })
  email!: string;

  @ApiProperty({
    example: "12345qwe678ad9",
    description: "Password",
    required: true,
  })
  @Length(6, 16, { message: "Uncorrect length, min 6, max 16" })
  password!: string;

  @ApiProperty({
    example: "+375 (29) 111 11 11",
    description: "Phone",
    required: true,
  })
  @IsString()
  phone!: string;

  details: UserDetailsDto;

  role?: RoleEntity;
}
