import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderItemEntity } from "../entities/order-item.entity";
import { createOrderItemDto } from "../dtos/create-order-item.dto";

@Injectable()
export class OrderItemRepository extends Repository<OrderItemEntity> {
    constructor(
        @InjectRepository(OrderItemEntity) OrderItemRepository: Repository<OrderItemEntity>,
    ) {
        super(OrderItemRepository.target, OrderItemRepository.manager, OrderItemRepository.queryRunner);
    }

    async createOrderItem(product: createOrderItemDto) {
        const orderItem = await this.create({
            created: new Date(),
            updated: new Date(),
            product_name: product.name,
            product_price: product.price,
            product_quantity: product.quantity,
            product_id: product.id,
        })
        return await this.save(orderItem);
    }
}