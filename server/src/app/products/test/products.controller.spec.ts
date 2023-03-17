import { Test, TestingModule } from "@nestjs/testing";

import { JwtAuthGuard } from "../../security/guards/jwt-auth.guard";
import { RolesGuard } from "../../security/guards/roles.guard";
import { ProductsController } from "../products.controller";
import { ProductsService } from "../products.service";
import {
    productCreateDto,
    productDto,
    productEntity,
} from "./mocks/data.mocks";

describe("CartController", () => {
    let controller: ProductsController;

    const mockedProductsService = {
        createProduct: jest.fn().mockResolvedValue(productEntity),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [ProductsController],
            providers: [
                {
                    provide: ProductsService,
                    useValue: mockedProductsService,
                },
            ],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue(true)
            .overrideGuard(RolesGuard)
            .useValue(true)
            .compile();
        controller = module.get<ProductsController>(ProductsController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    describe("on post request on '/products'", () => {
        it("should return productDto", async () => {
            const createProduct = await controller.createProduct(
                productCreateDto
            );
            expect(createProduct).toBeDefined();
            expect(createProduct).toMatchObject(productDto);
        });
    });
    // describe("on post request on '/cart'", () => {
    //     it("should return cartSessionDto", async () => {
    //         const addCartItem = await controller.addCartItem(user, cartItemDto);
    //         expect(addCartItem).toBeDefined();
    //         expect(addCartItem).toMatchObject(cart);
    //     });
    // });
    // describe("on put request on '/cart'", () => {
    //     it("should return cartSessionDto", async () => {
    //         const updateCartItem = await controller.updateCartItem(
    //             user,
    //             cartItemDto
    //         );
    //         expect(updateCartItem).toBeDefined();
    //         expect(updateCartItem).toMatchObject(cart);
    //     });
    // });
    // describe("on delete request on '/cart'", () => {
    //     it("should return cartSessionDto", async () => {
    //         const cleanCart = await controller.cleanCart(user);
    //         expect(cleanCart).toBeDefined();
    //         expect(cleanCart).toMatchObject(cart);
    //     });
    // });
    // describe("on delete request on '/cart/productId'", () => {
    //     it("should return cartSessionDto", async () => {
    //         const deleteCartItem = await controller.deleteCartItem(
    //             user,
    //             "d5232d45-99e6-40ca-83fc-3ead715c5fdc"
    //         );
    //         expect(deleteCartItem).toBeDefined();
    //         expect(deleteCartItem).toMatchObject(cart);
    //     });
    // });
});
