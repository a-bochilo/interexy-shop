import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderItemEntity } from "../entities/order-item.entity";

@Injectable()
export class OrderItemRepository extends Repository<OrderItemEntity> {
    constructor(
        @InjectRepository(OrderItemEntity) OrderItemRepository: Repository<OrderItemEntity>,
    ) {
        super(OrderItemRepository.target, OrderItemRepository.manager, OrderItemRepository.queryRunner);
    }

    async createOrderItem(orderItem: OrderItemEntity): Promise<OrderItemEntity> {
        return await this.save(orderItem);
    }
}