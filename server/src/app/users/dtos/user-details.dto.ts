// ========================== validator ==================================
import { IsNotEmpty, IsString } from "class-validator";

// ========================== swagger ====================================
import { ApiProperty } from "@nestjs/swagger";

export class UserDetailsDto {
  @ApiProperty({
    example: "John",
    description: "User firstname",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly firstname!: string;

  @ApiProperty({
    example: "Smith",
    description: "User lastname",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly lastname!: string;

  @ApiProperty({
    example: "Fitzgerald",
    description: "User middlename",
    required: false,
  })
  @IsString()
  readonly middlename?: string;
}
