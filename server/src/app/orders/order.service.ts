import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { I18nContext } from "nestjs-i18n";

// ========================== Entities & DTO's ==========================
import { OrderDto } from "./dtos/order.dto";
import { CartSessionDto } from "../cart/dtos/cart-session.dto";
import { OrderItemEntity } from "./entities/order-item.entity";
import { ProductEntity } from "../products/entities/product.entity";
import { OrderEntity } from "./entities/order.entity";

// ========================== Repositories ==============================
import { OrderRepository } from "./repos/order.repository";
import { ProductsRepository } from "../products/repos/products.repository";

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductsRepository,
    private readonly userRepository: UserRepository,
    private readonly orderItemRepository: OrderItemRepository
  ) {}
 
  async getAllOrders() {
    return await this.orderRepository.getAllOrders();
  }

  async getOrdersByUserId(id: string) {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new HttpException(
        `${I18nContext.current().t("errors.user.userDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );
    }
    return await this.orderRepository.getOrdersByUserId(id);
  }

    async createOrder(cart: CartSessionDto, userId: string): Promise<OrderDto> {
        if (!cart.items.length) {
            throw new HttpException(
                I18nContext.current().t("errors.cart.cartIsEmpty"),
                HttpStatus.BAD_REQUEST
            );
        }
        const productIds = cart.items.map((item) => item.productId);
        const prodEntities = await this.productRepository.getProductsArrayByIds(
            productIds
        );
      
    prodEntities.map((product, i) => {
      const res = product.quantity - cart.items[i].quantity;

            if (res < 0) {
                throw new HttpException(
                    `'${product.name}'. ${I18nContext.current().t(
                        "errors.products.productNotEnough"
                    )} ${product.quantity}`,
                    HttpStatus.BAD_REQUEST
                );
            }
        });

    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new HttpException(
        `${I18nContext.current().t("errors.user.userDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );
    }

    const order = await this.orderRepository.createOrder(user);
      
    const orderItems = await Promise.all(
      prodEntities.map(async (product, i) => {
        return await this.createOrderItem(
          order,
          product,
          cart.items[i].quantity
        );
      })
    );

    order.items = orderItems;
    order.total = orderItems.reduce(
      (acccumulator: number, item) =>
        acccumulator + item.product_price * item.product_quantity,
      0
    );
    
    const newOrder = await this.orderRepository.saveOrder(order);
    return await OrderDto.fromEntity(newOrder);
  }
    order.items = orderItems;
    order.total = orderItems.reduce(
      (acccumulator: number, item) =>
        acccumulator + item.product_price * item.product_quantity,
      0
    );
    
    const newOrder = await this.orderRepository.saveOrder(order);
    return await OrderDto.fromEntity(newOrder);
  }

  async createOrderItem(
    order: OrderEntity,
    product: ProductEntity,
    quantity: number
  ): Promise<OrderItemEntity> {
    const item = new OrderItemEntity();
    item.created = new Date();
    item.updated = new Date();
    item.product_quantity = quantity;
    item.order = order;
    item.product = product;
    item.product_name = product.name;
    item.product_price = product.price;
    return await this.orderItemRepository.createOrderItem(item);
  }
}
