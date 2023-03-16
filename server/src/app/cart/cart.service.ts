import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";

// ========================== Entities ==========================
import { CartEntity } from "./entities/cart.entity";
import { CartItemEntity } from "./entities/cart-item.entity";

// ========================== Repos ==========================
import { CartRepository } from "./repos/cart.repository";
import { UserRepository } from "../users/repos/user.repository";
import { ProductsRepository } from "../products/repos/products.repository";
import { CartItemRepository } from "./repos/cart-item.repository";

// ========================== DTO's ==========================
import { CartItemDto } from "./dtos/cart-item.dto";
import { UserSessionDto } from "../users/dtos/user-session.dto";

@Injectable()
export class CartService {
    constructor(
        private readonly cartRepository: CartRepository,
        private readonly cartItemRepository: CartItemRepository,
        private readonly userRepository: UserRepository,
        private readonly productsRepository: ProductsRepository
    ) {}

    async addCartItem(
        user: UserSessionDto,
        cartItemDto: CartItemDto
    ): Promise<CartEntity> {
        const cart = await this.getUserCart(user);
        const item = await this.createCartItem(cart, cartItemDto);

        cart.items = [...cart.items, item];

        return await this.cartRepository.saveCart(cart);
    }

    async updateCartItem(
        user: UserSessionDto,
        cartItemDto: CartItemDto
    ): Promise<CartEntity> {
        const cart = await this.getUserCart(user);

        const item = cart.items.find(
            (item) => item.product_id === cartItemDto.productId
        );
        item.quantity = cartItemDto.quantity;

        await this.cartItemRepository.saveCartItem(item);
        return await this.cartRepository.saveCart(cart);
    }

    async deleteCartItem(
        user: UserSessionDto,
        productId: string
    ): Promise<CartEntity> {
        const cart = await this.getUserCart(user);

        const existedItem = cart.items.find((item) => {
            return item.product_id === productId;
        });

        if (!existedItem) {
            throw new HttpException(
                "Cart item does not exist",
                HttpStatus.BAD_REQUEST
            );
        }

        const items = cart.items.filter(
            (item) => item.product_id !== productId
        );

        cart.items = items;

        await this.cartItemRepository.deleteCartItem(existedItem.id);
        return await this.cartRepository.saveCart(cart);
    }

    async getUserCart(user: UserSessionDto): Promise<CartEntity> {
        // const userFromDB = await this.userRepository.getById(
        //     user.id
        // );

        //! code below must be deleted in case auth module implemented
        const userFromDB = await this.userRepository.getById(
            "4e4d6aeb-ba9b-4394-b9e2-2d0f5b06c3b2"
        );

        if (!userFromDB) {
            throw new HttpException(
                "User does not exist",
                HttpStatus.UNAUTHORIZED
            );
        }

        if (!userFromDB.cart_id) {
            const cart = await this.cartRepository.createCart(userFromDB);
            userFromDB.cart = cart;
            await this.userRepository.save(userFromDB);
        }

        return await this.cartRepository.getCartByIdWithItems(
            userFromDB.cart_id
        );
    }

    async createCartItem(
        cart: CartEntity,
        cartItemDto: CartItemDto
    ): Promise<CartItemEntity> {
        const product = await this.productsRepository.getProductById(
            cartItemDto.productId
        );

        if (!product) {
            throw new HttpException(
                "Product does not exist",
                HttpStatus.BAD_REQUEST
            );
        }

        if (product.quantity < cartItemDto.quantity) {
            throw new HttpException(
                "Product quantity less then required in request",
                HttpStatus.BAD_REQUEST
            );
        }

        const item = new CartItemEntity();
        item.created = new Date();
        item.quantity = cartItemDto.quantity;
        item.cart = cart;
        item.quantity = cartItemDto.quantity;
        item.product = product;

        return await this.cartItemRepository.saveCartItem(item);
    }
}
