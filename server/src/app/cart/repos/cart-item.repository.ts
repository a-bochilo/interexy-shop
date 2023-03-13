import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// ========================== Entities & DTO's ==========================
import { CartItemEntity } from "../entities/cart-item.entity";

@Injectable()
export class CartItemRepository {
    constructor(
        @InjectRepository(CartItemEntity)
        private readonly cartItemRepository: Repository<CartItemEntity>
    ) {}
}
