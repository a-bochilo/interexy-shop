import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";

// ========================== Entities & DTO's ==========================
import { CartEntity } from "../entities/cart.entity";
import { UserEntity } from "src/app/users/entities/user.entity";

@Injectable()
export class CartRepository {
    constructor(
        @InjectRepository(CartEntity)
        private readonly cartRepository: Repository<CartEntity>
    ) {}

    async saveCart(cart: CartEntity): Promise<CartEntity> {
        cart.updated = new Date();
        return await this.cartRepository.save(cart);
    }

    async createCart(user: UserEntity): Promise<CartEntity> {
        const newCart = new CartEntity();
        newCart.created = new Date();
        newCart.user = user;
        newCart.items = [];
        return await this.saveCart(newCart);
    }

    async deleteCart(cartId: string): Promise<DeleteResult> {
        return await this.cartRepository.delete(cartId);
    }

    async getCartByUserId(userId: string): Promise<CartEntity> {
        return await this.cartRepository.findOne({ where: { userId } });
    }

    async getCartByIdWithItems(id: string): Promise<CartEntity> {
        return await this.cartRepository.findOne({
            where: { id },
            relations: ["items"],
        });
    }
}
