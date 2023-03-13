import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// ========================== Entities & DTO's ==========================
import { CartEntity } from "../entities/cart.entity";

@Injectable()
export class CartRepository {
    constructor(
        @InjectRepository(CartEntity)
        private readonly cartRepository: Repository<CartEntity>
    ) {}

    async saveCart(cart: CartEntity) {
        return await this.cartRepository.save(cart);
    }
}
