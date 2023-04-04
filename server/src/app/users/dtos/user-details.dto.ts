// ========================== validator ==================================
import { IsNotEmpty, IsString } from "class-validator";

// ========================== swagger ====================================
import { ApiProperty } from "@nestjs/swagger";
import { UserDetailsEntity } from "../entities/user-details.entity";

export class UserDetailsDto {
  @ApiProperty({
    example: "John",
    description: "User firstname",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  firstname!: string;

  @ApiProperty({
    example: "Smith",
    description: "User lastname",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  lastname!: string;

  @ApiProperty({
    example: "Fitzgerald",
    description: "User middlename",
    required: false,
  })
  @IsString()
  middlename?: string;

  static fromEntity(details: UserDetailsEntity): UserDetailsDto {
    const dto = new UserDetailsDto();
    dto.firstname = details.firstname;
    dto.lastname = details.lastname;
    dto.middlename = details.middlename;
    return dto;
  }
}
