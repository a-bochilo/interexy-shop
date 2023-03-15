import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

// ========================== Entities & DTO's ==========================
import { CreateOrderDto } from "./dtos/create-order.dto";

// ========================== Repositories ==============================
import { OrderRepository } from "./repos/order.repository";

// ========================== Services & Controllers ====================
import { UserService } from "../users/user.service";

@Injectable()
export class OrderService {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly userService: UserService,
    ) { }

    async createOrder(order: CreateOrderDto, userId: string) {
        try {
            const newOrder = await this.orderRepository.createOrder(order, userId);
            const user = await this.userService.getById(userId);
            user?.order?.push(newOrder);
            return await this.userService.updateUserOrder(user)
        } catch (error) {
            throw new HttpException(
                `${error}`,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async getAllOrders() {
        try {
            return await this.orderRepository.getAll();
        } catch (error) {
            throw new HttpException(
                `${error}`,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async getOrderById(id: string) {
        try {
            return await this.orderRepository.getById(id);
        } catch (error) {
            throw new HttpException(
                `${error}`,
                HttpStatus.BAD_REQUEST
            )
        }
    }
}