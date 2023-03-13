// ========================== common ==========================
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm/repository/Repository";

// ========================== entities, dtos ==========================
import { OrderItemsEntity } from "../entities/order-items.entity";

@Injectable()
export class OrderItemsRepo {
  constructor(
    @InjectRepository(OrderItemsEntity)
    private readonly orderItemsRepository: Repository<OrderItemsEntity>,
  ) {}

  async createOrderItem(item: {
    product: ProductEntity;
    quantity: number;
  }): Promise<OrderItemsEntity> {
    const newOrderItem = new OrderItemsEntity();

    (newOrderItem.created = new Date()),
      (newOrderItem.updated = new Date()),
      (newOrderItem.productId = item.product.productId),
      (newOrderItem.productName = item.product.productName),
      (newOrderItem.productPrice = item.product.productPrice),
      (newOrderItem.productQuantity = item.product.productQuantity),
      (newOrderItem.product = item.product);

    return await this.orderItemsRepository.save(newOrderItem);
  }
}
