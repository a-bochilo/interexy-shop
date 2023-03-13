// ========================== common ==========================
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProudctEntity } from "app/products/entities/product.entity";
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
    product: ProudctEntity;
    quantity: number;
  }): Promise<OrderItemsEntity> {
    const newOrderItem = new OrderItemsEntity();

    newOrderItem.created = new Date();
      newOrderItem.updated = new Date();
      newOrderItem.productId = item.product.id;
      newOrderItem.productName = item.product.name;
      newOrderItem.productPrice = item.product.price;
      newOrderItem.productQuantity = item.product.quantity;
      newOrderItem.product = item.product;

    return await this.orderItemsRepository.save(newOrderItem);
  }
}
