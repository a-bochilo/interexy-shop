// ========================== swagger ====================================
import { ApiProperty } from "@nestjs/swagger";

// ========================== validator ==================================
import { IsNotEmpty } from "class-validator";

export class CreateOrderDto {
  @ApiProperty({
    example: "12",
    description: "Total",
    required: true,
  })
  @IsNotEmpty()
  readonly total!: number;
}
