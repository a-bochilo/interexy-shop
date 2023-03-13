// ========================== common ==========================
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

// ========================== entities ==========================
import { OrderEntity } from "./entities/order.entity";

// ========================== repo & dtos ==========================
import { OrderItemsRepo } from "./repos/order-items.repo";
import { OrderDto } from "./dtos/order.dto";
import { OrdersRepo } from "./repos/orders.repo";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repo_product: ProductsRepo,
    private readonly repo_order_items: OrderItemsRepo,
    private readonly repo_order: OrdersRepo
  ) {}

  async createOrder(array: OrderDto[]) {
    const ProductsItems = await array.map((item) => {
      const product = this.repo_product.find(item.id);
      return { product, quantity: item.quantity };
    });
    const orderItems = ProductsItems.map(async (item) => {
      return await this.repo_order_items.createOrderItem(item);
    });
    return this.repo_order.createOneOrder(orderItems);
  }
}
