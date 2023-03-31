// ========================== validator ==================================
import { IsNotEmpty } from "class-validator";

// ========================== swagger ====================================
import { ApiProperty } from "@nestjs/swagger";

export class AssignUserRoleDto {
  @ApiProperty({
    example: "default_user",
    description: "Role name",
  })
  @IsNotEmpty()
  readonly newRole: string;
}
