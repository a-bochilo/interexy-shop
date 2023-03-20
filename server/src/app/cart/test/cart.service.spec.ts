import { TestingModule, Test } from "@nestjs/testing";
import { ProductsRepository } from "../../products/repos/products.repository";
import { UserRepository } from "../../users/repos/user.repository";
import { CartService } from "../cart.service";
import { CartItemRepository } from "../repos/cart-item.repository";
import { CartRepository } from "../repos/cart.repository";
import { HttpException } from "@nestjs/common";
import {
    cartEntity,
    cartItemEntity2,
    userSessionDto,
    product,
    cartItemDto,
    cartEntityWithExtraItem,
} from "./mocks/data.mocks";

jest.mock("nestjs-i18n", () => ({
    I18nContext: {
        current: () => ({
            t: () => "text",
        }),
    },
}));

describe("CartService", () => {
    let cartService: CartService;

    const mockedCartRepo = {
        saveCart: jest.fn().mockResolvedValue(cartEntity),
        createCart: jest.fn().mockResolvedValue(cartEntity),
        getCartByIdWithItems: jest.fn().mockResolvedValue(cartEntity),
    };

    const mockedCartItemRepo = {
        saveCartItem: jest.fn().mockResolvedValue(cartItemEntity2),
        deleteCartItem: jest.fn().mockResolvedValue({}),
        deleteCartItems: jest.fn().mockResolvedValue({}),
    };

    const mockedUserRepo = {
        getById: jest.fn().mockResolvedValue(userSessionDto),
        save: jest.fn().mockResolvedValue({}),
    };

    const mockedProductRepo = {
        getProductById: jest.fn().mockResolvedValue(product),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CartService,
                {
                    provide: CartRepository,
                    useValue: mockedCartRepo,
                },
                {
                    provide: CartItemRepository,
                    useValue: mockedCartItemRepo,
                },
                {
                    provide: UserRepository,
                    useValue: mockedUserRepo,
                },
                {
                    provide: ProductsRepository,
                    useValue: mockedProductRepo,
                },
            ],
        }).compile();

        cartService = await module.get(CartService);
    });
    it("should be defined", () => {
        expect(cartService).toBeDefined();
    });
    describe("method 'getUserCart'", () => {
        describe("should return cart entity or throw error depends on if user does not exist in db", () => {
            it("should return cart entity", async () => {
                const returnedCart = await cartService.getUserCart(
                    userSessionDto
                );
                expect(returnedCart).toBeDefined();
                expect(returnedCart).toMatchObject(cartEntity);
            });
            it("should return error because user does not exist", async () => {
                mockedUserRepo.getById = jest.fn().mockResolvedValue(null);
                try {
                    await cartService.getUserCart(userSessionDto);
                } catch (error) {
                    expect(error).toBeInstanceOf(HttpException);
                }
            });
            it("should return cart in case user has not already had it", async () => {
                const userWithoutCart = userSessionDto;
                delete userWithoutCart.cart_id;
                mockedUserRepo.getById = jest
                    .fn()
                    .mockResolvedValue(userWithoutCart);

                const returnedCart = await cartService.getUserCart(
                    userWithoutCart
                );
                expect(returnedCart).toBeDefined();
                expect(returnedCart).toMatchObject(cartEntity);
            });
        });
    });
    describe("method 'addCartItem'", () => {
        describe("should return cart entity or throw error depends on if product already in cart", () => {
            it("should return cart entity with new item", async () => {
                const returnedCart = await cartService.addCartItem(
                    userSessionDto,
                    cartItemDto
                );

                expect(returnedCart).toBeDefined();
                expect(returnedCart).toMatchObject(cartEntityWithExtraItem);
            });
            it("should return return error because product already in cart", async () => {
                const dto = { ...cartItemDto };
                dto.productId = cartEntity.items[0].product_id;

                try {
                    await cartService.addCartItem(userSessionDto, dto);
                } catch (error) {
                    expect(error).toBeInstanceOf(HttpException);
                }
            });
        });
    });
    describe("method 'createCartItem'", () => {
        describe("should return cart item entity or throw error depends on if user product not exist in db or quantity of product in db less than in dto", () => {
            it("should return cart item entity", async () => {
                const returnedCartItem = await cartService.createCartItem(
                    cartEntity,
                    cartItemDto
                );
                expect(returnedCartItem).toBeDefined();
                expect(returnedCartItem).toMatchObject(cartItemEntity2);
            });
            it("should return error because quantity of product in db less than in dto", async () => {
                const cartItem = { ...cartItemDto };
                cartItem.quantity = 200;
                try {
                    await cartService.createCartItem(cartEntity, cartItem);
                } catch (error) {
                    expect(error).toBeInstanceOf(HttpException);
                }
            });
            it("should return error because product does not exist", async () => {
                mockedProductRepo.getProductById = jest
                    .fn()
                    .mockResolvedValue(null);
                try {
                    await cartService.createCartItem(cartEntity, cartItemDto);
                } catch (error) {
                    expect(error).toBeInstanceOf(HttpException);
                }
            });
        });
    });
    describe("method 'deleteCartItem'", () => {
        describe("should return cart entity with empty items array (starts with 1 item) or throw error depends on if item does not exist in cart", () => {
            it("should return cart entity", async () => {
                const returnedCart = await cartService.deleteCartItem(
                    userSessionDto,
                    cartEntity.items[0].product_id
                );
                expect(returnedCart).toBeDefined();
                expect(returnedCart.items).toMatchObject([]);
            });
            it("should return error product does not exist in cart", async () => {
                try {
                    await cartService.deleteCartItem(
                        userSessionDto,
                        cartItemEntity2.product_id
                    );
                } catch (error) {
                    expect(error).toBeInstanceOf(HttpException);
                }
            });
        });
    });
    describe("method 'cleanCart'", () => {
        it("should return cart with empty items array", async () => {
            const cleanCart = await cartService.cleanCart(userSessionDto);

            expect(cleanCart).toBeDefined();
            expect(cleanCart.items).toMatchObject([]);
        });
    });
});
