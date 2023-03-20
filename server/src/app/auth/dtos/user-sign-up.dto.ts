import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
  Length,
} from "class-validator";

// ========================== DTO's ==========================
import { UserDetailsDto } from "../../users/dtos/user-details.dto";

// ========================== Entities ==========================
import { RoleEntity } from "../../roles/entities/role.entity";
import { ApiProperty } from "@nestjs/swagger";

export class UserSignUpDto {
  @ApiProperty({
    example: "test@test.com",
    description: "Email",
    required: true,
  })
  @IsEmail(undefined, { message: "Uncorrect email" })
  readonly email!: string;

  @ApiProperty({
    example: "12345qwe678ad9",
    description: "Password",
    required: true,
  })
  @Length(6, 16, { message: "Uncorrect length, min 6, max 16" })
  readonly password!: string;

  @ApiProperty({
    example: "+375 (29) 111 11 11",
    description: "Phone",
    required: true,
  })
  @IsString()
  readonly phone!: string;

  details: UserDetailsDto;
}
