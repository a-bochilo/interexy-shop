import { UUIDDto } from "../../../shared/dtos/uuid.dto";
import { OrderEntity } from "../entities/order.entity";

export class OrderDto extends UUIDDto {
  total: number;
  user_id: string;

  static fromEntity(order: OrderEntity) {
    const dto = new OrderDto();
    dto.id = order.id;
    dto.created = order.created.valueOf();
    dto.updated = order.updated.valueOf();
    dto.total = order.total;
    dto.user_id = order.user_id;

    return dto;
  }
}
