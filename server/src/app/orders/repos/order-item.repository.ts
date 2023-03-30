import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderItemEntity } from "../entities/order-item.entity";
import { OrderItemDto } from "../dtos/order-item.dto";

@Injectable()
export class OrderItemRepository extends Repository<OrderItemEntity> {
  constructor(
    @InjectRepository(OrderItemEntity) OrderItemRepository: Repository<OrderItemEntity>
  ) {
    super(
      OrderItemRepository.target,
      OrderItemRepository.manager,
      OrderItemRepository.queryRunner
    );
  }

  async createOrderItem(orderItem: OrderItemEntity): Promise<OrderItemEntity> {
    return await this.save(orderItem);
  }

  async getOrdersById(orderId: string): Promise<OrderItemDto[]> {
    return await this.find({ where: { order_id: orderId } });
  }
}
