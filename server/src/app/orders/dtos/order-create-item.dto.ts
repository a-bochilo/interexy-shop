// ========================== swagger ====================================
import { ApiProperty } from "@nestjs/swagger";

// ========================== validator ==================================
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { UUIDDto } from "src/shared/dtos/uuid.dto";

export class createOrderItemDto extends UUIDDto {
  @ApiProperty({
    example: "12",
    description: "Quantity",
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly quantity!: number;

  @ApiProperty({
    example: "123123123",
    description: "id",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly id!: string;

  @ApiProperty({
    example: "Shirts",
    description: "Product name",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly name!: string;

  @ApiProperty({
    example: "12",
    description: "Price",
  })
  @IsNumber()
  readonly price: number;
}
