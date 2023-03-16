import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

// ========================== Entities & DTO's ==========================
import { CreateOrderDto } from "./dtos/create-order.dto";

// ========================== Repositories ==============================
import { OrderRepository } from "./repos/order.repository";

// ========================== Services & Controllers ====================
import { UserService } from "../users/user.service";
import { ProductDto } from "../products/dtos/product.dto";
import { OrderItemEntity } from "./entities/order-item.entity";
import { ProductEntity } from "../products/entities/product.entity";
import { createOrderItemDto } from "./dtos/create-order-item.dto";
import { ProductsRepository } from "../products/repos/products.repository";
import { CartSessionDto } from "../cart/dtos/cart-session.dto";
import { OrderEntity } from "./entities/order.entity";
import { UserRepository } from "../users/repos/user.repository";
import { CartItemDto } from "../cart/dtos/cart-item.dto";
import { OrderItemRepository } from "./repos/order-item.repository";
import { OrderDto } from "./dtos/order.dto";

@Injectable()
export class OrderService {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly productRepository: ProductsRepository,
        private readonly userRepository: UserRepository,
        private readonly orderItemRepository: OrderItemRepository
    ) {}

    async getAllOrders() {
        return await this.orderRepository.getAll();
    }

    async getOrderById(id: string) {
        return await this.orderRepository.getById(id);
    }

    async createOrder(cart: CartSessionDto, userId: string): Promise<OrderDto> {
        if (!cart.items.length) {
            throw new HttpException(`Cart is empty!`, HttpStatus.BAD_REQUEST);
        }
        const productIds = cart.items.map((item) => item.productId);
        const prodEntities = await this.productRepository.getProductsArrayByIds(
            productIds
        );

        prodEntities.map((product, i) => {
            const res = product.quantity - cart.items[i].quantity;

            if (res < 0) {
                throw new HttpException(
                    `Product '${product.name}' is ended`,
                    HttpStatus.BAD_REQUEST
                );
            }
        });

        const user = await this.userRepository.getById(userId);

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
        const newOrder = await this.orderRepository.save(order);
        return OrderDto.fromEntity(newOrder);
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
