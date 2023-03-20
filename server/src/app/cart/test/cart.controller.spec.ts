import { Test, TestingModule } from "@nestjs/testing";

import { UserPermissions } from "../../../shared/types/user-permissions.enum";
import { UserRoles } from "../../../shared/types/user-roles.enum";
import { CartSessionDto } from "../dtos/cart-session.dto";
import { CartController } from "../cart.controller";
import { CartService } from "../cart.service";
import { JwtAuthGuard } from "../../security/guards/jwt-auth.guard";
import { RolesGuard } from "../../security/guards/roles.guard";

describe("CartController", () => {
    let controller: CartController;

    const date = new Date();

    const cart: CartSessionDto = {
        id: "39357c86-29d3-4df0-a1e0-ef0626d0d877",
        created: date.valueOf(),
        updated: date.valueOf(),
        items: [
            {
                productId: "d5232d45-99e6-40ca-83fc-3ead715c5fdc",
                quantity: 10,
            },
        ],
    };

    const cartItemEntity = {
        id: "39357c86-29d3-4df0-a1e0-ef0626d0d877",
        created: date,
        updated: date,
        product_id: "d5232d45-99e6-40ca-83fc-3ead715c5fdc",
        quantity: 10,
    };

    const cartItemDto = {
        id: "39357c86-29d3-4df0-a1e0-ef0626d0d877",
        created: date,
        updated: date,
        productId: "d5232d45-99e6-40ca-83fc-3ead715c5fdc",
        quantity: 10,
    };

    const cartEntity = {
        id: "39357c86-29d3-4df0-a1e0-ef0626d0d877",
        created: date,
        updated: date,
        items: [cartItemEntity],
    };

    const user = {
        id: "94ff2989-7ffa-4c2a-bfae-5fa78a751fd5",
        email: "test@test.com",
        role_id: 2,
        role_type: UserRoles.user,
        created: date.valueOf(),
        updated: date.valueOf(),
        permissions: [
            UserPermissions.getCart,
            UserPermissions.addCartItem,
            UserPermissions.updateCartItem,
            UserPermissions.deleteCartItem,
            UserPermissions.cleanCart,
            UserPermissions.createOrder,
            UserPermissions.getProfileOrders,
            UserPermissions.getUserProfile,
            UserPermissions.updateUserProfile,
        ],
    };

    const mockedCartService = {
        addCartItem: jest.fn().mockResolvedValue(cartEntity),
        updateCartItem: jest.fn().mockResolvedValue(cartEntity),
        deleteCartItem: jest.fn().mockResolvedValue(cartEntity),
        cleanCart: jest.fn().mockResolvedValue(cartEntity),
        getUserCart: jest.fn().mockResolvedValue(cartEntity),
        createCartItem: jest.fn().mockResolvedValue(cartItemEntity),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [CartController],
            providers: [
                {
                    provide: CartService,
                    useValue: mockedCartService,
                },
            ],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue(true)
            .overrideGuard(RolesGuard)
            .useValue(true)
            .compile();
        controller = module.get<CartController>(CartController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    describe("on get request on '/cart'", () => {
        it("should return cartSessionDto", async () => {
            const getCart = await controller.getCart(user);
            expect(getCart).toBeDefined();
            expect(getCart).toMatchObject(cart);
        });
    });
    describe("on post request on '/cart'", () => {
        it("should return cartSessionDto", async () => {
            const addCartItem = await controller.addCartItem(user, cartItemDto);
            expect(addCartItem).toBeDefined();
            expect(addCartItem).toMatchObject(cart);
        });
    });
    describe("on put request on '/cart'", () => {
        it("should return cartSessionDto", async () => {
            const updateCartItem = await controller.updateCartItem(
                user,
                cartItemDto
            );
            expect(updateCartItem).toBeDefined();
            expect(updateCartItem).toMatchObject(cart);
        });
    });
    describe("on delete request on '/cart'", () => {
        it("should return cartSessionDto", async () => {
            const cleanCart = await controller.cleanCart(user);
            expect(cleanCart).toBeDefined();
            expect(cleanCart).toMatchObject(cart);
        });
    });
    describe("on delete request on '/cart/productId'", () => {
        it("should return cartSessionDto", async () => {
            const deleteCartItem = await controller.deleteCartItem(
                user,
                "d5232d45-99e6-40ca-83fc-3ead715c5fdc"
            );
            expect(deleteCartItem).toBeDefined();
            expect(deleteCartItem).toMatchObject(cart);
        });
    });
});
