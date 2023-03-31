// ============================ nest ====================================
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

// ============================ i18n ====================================
import { I18nContext } from "nestjs-i18n";

// ========================== entities & dto's ==========================
import { OrderDto } from "./dtos/order.dto";
import { CartSessionDto } from "../cart/dtos/cart-session.dto";
import { OrderItemEntity } from "./entities/order-item.entity";
import { ProductEntity } from "../products/entities/product.entity";
import { OrderEntity } from "./entities/order.entity";

// ========================== repositories ==============================
import { OrderRepository } from "./repos/order.repository";
import { ProductsRepository } from "../products/repos/products.repository";
import { UserRepository } from "../users/repos/user.repository";
import { OrderItemRepository } from "./repos/order-item.repository";

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

  async getOrderItemByOrderId(orderId: string) {
    return await this.orderItemRepository.getOrdersById(orderId);
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

  async createOrder(cart: CartSessionDto, userId: string): Promise<OrderDto> {
    if (!cart.items.length) {
      throw new HttpException(
        I18nContext.current().t("errors.cart.cartIsEmpty"),
        HttpStatus.BAD_REQUEST
      );
    }
    /*
     * If there is a cart, then go through the array of products in the cart,
     *   go to the database and get a list of products from the database corresponding
     *   to the list in the cart.
     */
    const productIds = cart.items.map((item) => item.productId);
    const prodEntities = await this.productRepository.getProductsArrayByIds(
      productIds
    );

    prodEntities.map((product, i) => {
      /*
       * Get the difference in the quantity of the ordered goods and
       *  the available and write it down in a variable 'priceSubstractionResult'
       */

      const priceSubstractionResult = product.quantity - cart.items[i].quantity;

      if (priceSubstractionResult < 0) {
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
      throw new HttpException(`User ${userId} not found`, HttpStatus.NOT_FOUND);
    }

    /*
     * If 'priceSubstractionResult' > 0 => user can create order
     */

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
}
