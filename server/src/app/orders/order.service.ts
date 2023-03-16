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
import { CartDto } from "./dtos/cart-dto";
import { OrderEntity } from "./entities/order.entity";

@Injectable()
export class OrderService {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly productRepository: ProductsRepository,
        private readonly userService: UserService,
    ) { }

//productId and quantity

    async createOrder(/*cart: CartDto, userId: string*/userId: string) {
        console.log(userId)
        // if(!cart.items.length) {
        //     throw new HttpException(
        //         `Cart is empty!`,
        //         HttpStatus.BAD_REQUEST
        //     );
        // }

        //const ids = cart.items.map((id) => id); //get [ids, ids, ids...]
        const ids = [
            "c4fee739-539b-4dcf-89bb-e343733db35d",
            "de6f8cb4-c12a-4f28-b3f6-545918821dbc",
        ]
        // get all products
        const prodEntities = await this.productRepository.getProductsArrayByIds(ids)
        // console.log(prodEntities)
        // get true/false quantity((
        const isEnought = prodEntities.map((item) => {
            const res = item.quantity - 1
            if(res > 0) {
                item.quantity = res;
                return true;
            } else if(res === 0) {
                item.isActive = false;
                item.quantity = 0;
                return true;
            } else {
                throw new HttpException(
                    `Product '${item.name}' is ended`,
                    HttpStatus.BAD_REQUEST
                );
            }
        })

        if(isEnought.includes(false)) {
            throw new HttpException(
                `Product is ended`,
                HttpStatus.BAD_REQUEST
            );
        } else {
            const orderItems = prodEntities.map((item) => {
                const { id, price } = item;
                const obj = {
                    id: id,
                    price: price,
                    quantity: 1,
                }
                return obj;
            })
            await this.productRepository.saveProductsArray(prodEntities);
            
            const total = orderItems.reduce((acccumulator: number, currValue) => acccumulator + currValue.price, 0);

            return await this.orderRepository.createOrder(orderItems, userId, total)
        }
    }

    async getAllOrders() {
        return await this.orderRepository.getAll();
    }

    async getOrderById(id: string) {
        return await this.orderRepository.getById(id);
    }
}
