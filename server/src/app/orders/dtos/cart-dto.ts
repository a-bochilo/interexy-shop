import { UUIDDto } from "src/shared/dtos/uuid.dto";
import { createOrderItemDto } from "./create-order-item.dto";

export class CartDto extends UUIDDto {
    items: createOrderItemDto[];
}