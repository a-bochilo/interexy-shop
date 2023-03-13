// ========================== common ==========================
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// ========================== entities & dtos ==========================
import { OrderEntity } from "../entities/order.entity";

@Injectable()
export class OrdersRepo {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>
  ) {}

  async createOneOrder(Items) {
    const newOrder = new OrderEntity();

      newOrder.created = new Date(),
      newOrder.updated = new Date(),
      newOrder.quantities = Items.quantities.reduce((sum, item) => sum + item.quantity)
      newOrder.total = Items.quantities.reduce((sum, item) => sum + item.total)
      newOrder.orderItems = Items;

    return await this.orderRepository.save(newOrder);
  }
}
