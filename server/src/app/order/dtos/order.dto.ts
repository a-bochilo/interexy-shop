import { UUIDDto } from "shared/dtos/uuid.dto";
// ========================== common ==========================
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsDate } from "class-validator";

// ========================== entities ==========================
import { UUIDEntity } from "shared/entities/uuid.entity";

export class OrderDto extends UUIDEntity {
  @ApiProperty({
    description: "Order id",
  })
  @IsString()
  @IsNotEmpty()
  id!: string;

  @ApiProperty({
    description: "Products quantity",
  })
  @IsNumber()
  @IsNotEmpty()
  quantity!: number;
}
