import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

// ========================== Entities ==========================
import { CartEntity } from "./entities/cart.entity";

// ========================== Repos ==========================
import { CartRepository } from "./repos/cart.repository";
import { UserRepository } from "app/users/repos/user.repository";

// ========================== DTO's & Enums ==========================
import { CartCreateDto } from "./dtos/cart-create.dto";

@Injectable()
export class CartService {
    constructor(
        private readonly cartRepository: CartRepository,
        private readonly userRepository: UserRepository
    ) {}

    async createCart(cartCreateDto: CartCreateDto): Promise<CartEntity> {
        const newCart = new CartEntity();
        newCart.userId = cartCreateDto.userId;

        return await this.cartRepository.saveCart(newCart);
    }
}
