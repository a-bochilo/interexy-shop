// ========================== common ==========================
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

// ========================== entities ==========================
import { OrderEntity } from "./entities/order.entity";

// ========================== repo & dtos ==========================
import { OrderItemsRepo } from "./repos/order-items.repo";
import { OrderDto } from "./dtos/order.dto";
import { OrdersRepo } from "./repos/orders.repo";
import { ProductsRepository } from "app/products/repos/products.repository";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repo_product: ProductsRepository,
    private readonly repo_order_items: OrderItemsRepo,
    private readonly repo_order: OrdersRepo
  ) {}

  async createOrder(array: OrderDto[]) {
    const ProductsItems = await array.map(async(item) => {
      const product = await this.repo_product.getProductById(item.id);
      return await { product, quantity: item.quantity };
    });
    const orderItems =await ProductsItems.map(async (item) => {
      return await this.repo_order_items.createOrderItem(await item);
    });
    return await this.repo_order.createOneOrder(orderItems);
  }
}
