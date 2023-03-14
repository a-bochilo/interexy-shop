import { Injectable } from "@nestjs/common";
import { OrderRepository } from "./repos/order.repository";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { UserSessionDto } from "../users/dtos/user-session.dto";
import { UserService } from "../users/user.service";
import { UserEntity } from "../users/entities/user.entity";
import { OrderEntity } from "./entities/order.entity";

@Injectable()
export class OrderService {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly userService: UserService,
        ) { }

    async createOrder(order: CreateOrderDto, userId: string) {
        const newOrder = await this.orderRepository.createOrder(order, userId);
        const user = await this.userService.getById(userId);
        user?.order?.push(newOrder);
        return await this.userService.updateUserOrder(user)
    }

    async getAllOrders() {
        return await this.orderRepository.getAll();
    }

    async getOrderById(id: string) {
        return await this.orderRepository.getById(id);
    }
}