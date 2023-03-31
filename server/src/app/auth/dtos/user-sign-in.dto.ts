// ========================== nest ==========================
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, validate } from "class-validator";

// ========================== enum ==========================
import { ErrorCodes } from "../../../shared/types/error-codes.enum";

export class UserSignInDto {
  @ApiProperty({
    description: "Email to sign in",
  })
  @IsEmail(undefined, { message: ErrorCodes.FieldShouldBeEmail })
  email!: string;

  @ApiProperty({
    description: "Password to sign in",
  })
  @IsString({ message: ErrorCodes.FieldShouldBeString })
  password!: string;

  static from(dto: UserSignInDto) {
    const it = new UserSignInDto();
    it.email = dto.email;
    it.password = dto.password;
    return it;
  }

  static async validate(dto: UserSignInDto) {
    const errors = await validate(dto);
    if (errors?.length) {
      return errors;
    }

    return null;
  }
}
