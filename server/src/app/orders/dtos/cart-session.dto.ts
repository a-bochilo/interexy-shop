// import { ApiProperty } from "@nestjs/swagger";
// import { Type } from "class-transformer";
// import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";

// // ========================== DTO's ==========================
// import { UUIDDto } from "src/shared/dtos/uuid.dto";
// import { CartItemDto } from "./cart-item.dto";

// // ========================== Entities ==========================
// import { CartEntity } from "../entities/cart.entity";

// export class CartSessionDto extends UUIDDto {
//     @ApiProperty({
//         description: "Products",
//         example: "[{productId: adfa44-2klasdfa, quantity: 4}]",
//         required: true,
//     })
//     @IsNotEmpty()
//     @IsArray()
//     @ValidateNested({ each: true })
//     @Type(() => CartItemDto)
//     items: CartItemDto[];

//     public static fromEntity(cart: CartEntity): CartSessionDto {
//         const dto = new CartSessionDto();

//         dto.id = cart.id;
//         dto.created = cart.created.valueOf();
//         dto.updated = cart.updated.valueOf();
//         dto.items = cart.items.map((item) => ({
//             productId: item.product_id,
//             quantity: item.quantity,
//         }));

//         return dto;
//     }
// }