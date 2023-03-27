import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { I18nContext } from "nestjs-i18n";

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
import { CartItemCreateDto } from "./dtos/cart-item-create.dto";

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
        cartItemDto: CartItemCreateDto
    ): Promise<CartEntity> {
        const cart = await this.getUserCart(user);
        const item = await this.createCartItem(cart, cartItemDto);

        const isProductInCart = !!cart.items.find(
            (item) => item.product_id === cartItemDto.productId
        );

        if (isProductInCart) {
            throw new HttpException(
                I18nContext.current().t("errors.cart.productAlreadyInCart"),
                HttpStatus.BAD_REQUEST
            );
        }
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

        if (!item) {
            throw new HttpException(
                I18nContext.current().t(
                    "errors.cart.productDoesNotExistInCart"
                ),
                HttpStatus.BAD_REQUEST
            );
        }

        item.quantity = cartItemDto.quantity;

        await this.cartItemRepository.saveCartItem(item);
        return await this.cartRepository.saveCart(cart);
    }

    async deleteCartItem(
        user: UserSessionDto,
        itemId: string
    ): Promise<CartEntity> {
        const cart = await this.getUserCart(user);

        const existedItem = cart.items.find((item) => {
            return item.id === itemId;
        });
        if (!existedItem) {
            throw new HttpException(
                I18nContext.current().t("errors.cart.productAlreadyInCart"),
                HttpStatus.BAD_REQUEST
            );
        }

        const items = cart.items.filter((item) => item.id !== itemId);

        await this.cartItemRepository.deleteCartItem(existedItem.id);

        cart.items = items;

        return await this.cartRepository.saveCart(cart);
    }

    async cleanCart(user: UserSessionDto): Promise<CartEntity> {
        const cart = await this.getUserCart(user);

        const itemIds = cart.items.map((item) => item.id);
        await this.cartItemRepository.deleteCartItems(itemIds);

        cart.items = [];

        return await this.cartRepository.saveCart(cart);
    }

    async getUserCart(user: UserSessionDto): Promise<CartEntity> {
        const userFromDB = await this.userRepository.getById(user.id);

        if (!userFromDB) {
            throw new HttpException(
                I18nContext.current().t("errors.user.userDoesNotExist"),
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
        cartItemDto: CartItemCreateDto
    ): Promise<CartItemEntity> {
        const product = await this.productsRepository.getProductById(
            cartItemDto.productId
        );

        if (!product) {
            throw new HttpException(
                I18nContext.current().t("errors.products.productDoesNotExist"),
                HttpStatus.BAD_REQUEST
            );
        }

        if (product.quantity < cartItemDto.quantity) {
            throw new HttpException(
                `${I18nContext.current().t(
                    "errors.products.productNotEnough"
                )} ${product.quantity}`,
                HttpStatus.BAD_REQUEST
            );
        }

        const item = new CartItemEntity();
        item.created = new Date();
        item.quantity = cartItemDto.quantity;
        item.cart = cart;
        item.quantity = cartItemDto.quantity;
        item.product_id = product.id;

        return await this.cartItemRepository.saveCartItem(item);
    }
}
