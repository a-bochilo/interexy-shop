import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderEntity } from "../entities/order.entity";
import { CreateOrderDto } from "../dtos/create-order.dto";
import { UserSessionDto } from "src/app/users/dtos/user-session.dto";

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

    async createOrder(order: CreateOrderDto, userId: string) {
        const newOrder = new OrderEntity();
        Object.assign(newOrder, order);
        newOrder.user_id = userId;
        newOrder.created = new Date();
        newOrder.updated = new Date();
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