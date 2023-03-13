// ========================== common ==========================
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class OrderNewDto {
  @ApiProperty({
    description: "Products quantity",
  })
  @IsNumber()
  @IsNotEmpty()
  quantity!: number;

  @ApiProperty({
    description: "Total",
  })
  @IsString()
  @IsNotEmpty()
  total!: number;
}
