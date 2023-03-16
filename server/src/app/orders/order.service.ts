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
import { OrderItemRepository } from "./repos/order-item.repository";
import { ProductsRepository } from "../products/repos/products.repository";
import { CartDto } from "./dtos/cart-dto";
import { OrderEntity } from "./entities/order.entity";

@Injectable()
export class OrderService {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly orderItemRepository: OrderItemRepository,
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
            "cfafa00a-463e-4750-a1df-645696788838",
            "135522af-fdf6-4ed2-88f2-adad4e8f77d5",
            "e457054e-07d4-4588-bfca-b2493ea6f418",
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
                const {id, price, quantity} = item;
                const obj = {
                    id: id,
                    price: price,
                    quantity: quantity,
                }
                return obj;
            })

            await this.productRepository.saveProductsArray(prodEntities);
            return await this.orderRepository.createOrder(orderItems, userId)
        }


    }

    async getAllOrders() {
        return await this.orderRepository.getAll();
    }

    async getOrderById(id: string) {
        return await this.orderRepository.getById(id);
    }

    async createOrderItem(product: ProductDto) {
        const newProduct = new createOrderItemDto();
        const rootProduct = await this.productRepository.getProductById(product.id)
        if(rootProduct.quantity - product.quantity >= 0) {
            const prod = new ProductEntity();
            prod.quantity = rootProduct.quantity - product.quantity;
            Object.assign(rootProduct, prod)
            Object.assign(newProduct, product);
            await this.productRepository.updateProduct(rootProduct);
            return await this.orderItemRepository.createOrderItem(newProduct);
        } else {
            throw new HttpException(
                `Product '${rootProduct.name}' is ended`,
                HttpStatus.UNPROCESSABLE_ENTITY
            );
        }
    }
}

//id, quantity - cart_item
//cart - [cart_item]

//cart
/*
id
created
updated
items: [
    cart_item,
    cart_item,
    cart_item,
]
*/