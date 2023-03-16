import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// ========================== Entities & DTO's ==========================
import { OrderEntity } from "../entities/order.entity";
import { CreateOrderDto } from "../dtos/create-order.dto";
import { createOrderItemDto } from "../dtos/create-order-item.dto";
import { UserEntity } from "src/app/users/entities/user.entity";

@Injectable()
export class OrderRepository extends Repository<OrderEntity> {
    constructor(
        @InjectRepository(OrderEntity) OrderRepository: Repository<OrderEntity>,
    ) {
        super(OrderRepository.target, OrderRepository.manager, OrderRepository.queryRunner);
    }

    async getOneById(orderId: string) {
        return await this.findOneBy({id: orderId});
    }

    async createOrder(user: UserEntity): Promise<OrderEntity> {
        const newOrder = new OrderEntity();
        newOrder.created = new Date();
        newOrder.updated = new Date();
        newOrder.total = 0;
        newOrder.user = user;
        newOrder.items = [];
        return await this.save(newOrder);
    }

    async getAll() {
        return await this.find();
    }

    async getById(id: string) {
        return await this.find({
            where: {
                user_id: id
            }
        });
    }
}