import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// ========================== Entities & DTO's ==========================
import { OrderEntity } from "../entities/order.entity";
import { CreateOrderDto } from "../dtos/create-order.dto";
import { createOrderItemDto } from "../dtos/create-order-item.dto";

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

    async createOrder(orderItems: any, userId: string) {
        const newOrder = new OrderEntity();
        const initValue = 0;
        const total = orderItems.reduce((acccumulator: number, currValue) => acccumulator + currValue.price, initValue);

        newOrder.order_items = orderItems;
        newOrder.order_item_id = '135522af-fdf6-4ed2-88f2-adad4e8f7725'
        newOrder.total = total;
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