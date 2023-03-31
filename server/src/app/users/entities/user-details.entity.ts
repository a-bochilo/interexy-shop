// ========================== typeorm ====================================
import { Column, Entity } from "typeorm";

// ========================== entities ===================================
import { UUIDEntity } from "../../../shared/entities/uuid.entity";

// ========================== swagger ====================================
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "user_details" })
export class UserDetailsEntity extends UUIDEntity {
  @ApiProperty({
    example: "John",
    description: "User firstname",
    required: true,
  })
  @Column({ name: "firstname" })
  firstname!: string;

  @ApiProperty({
    example: "Smith",
    description: "User lastname",
    required: true,
  })
  @Column({ name: "lastname" })
  lastname!: string;

  @ApiProperty({
    example: "Fitzgerald",
    description: "User middlename",
    required: false,
  })
  @Column({ name: "middlename" })
  middlename?: string;
}
