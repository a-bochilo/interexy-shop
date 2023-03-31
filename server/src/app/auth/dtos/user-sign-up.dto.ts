// ========================== nest ==========================
import { IsEmail, IsString, Length } from "class-validator";

// ========================== dto ==========================
import { UserDetailsDto } from "../../users/dtos/user-details.dto";

// ========================== entities ==========================
import { ApiProperty } from "@nestjs/swagger";

export class UserSignUpDto {
  @ApiProperty({
    example: "test@test.com",
    description: "Email",
    required: true,
  })
  @IsEmail(undefined, { message: "Incorrect email" })
  readonly email!: string;

  @ApiProperty({
    example: "12345qwe678ad9",
    description: "Password",
    required: true,
  })
  @Length(6, 16, { message: "Incorrect length, min 6, max 16" })
  readonly password!: string;

  @ApiProperty({
    example: "+375291111111",
    description: "Phone",
    required: true,
  })
  @IsString()
  readonly phone!: string;

  details: UserDetailsDto;
}
