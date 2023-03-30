import { Test, TestingModule } from "@nestjs/testing";
import { HttpException } from "@nestjs/common";

// ========================== Services & Controllers ====================
import { OrderService } from "../order.service";

// ========================== Repositories ==============================
import { UserRepository } from "../../users/repos/user.repository";
import { ProductsRepository } from "../../products/repos/products.repository";
import { OrderItemRepository } from "../repos/order-item.repository";
import { OrderRepository } from "../repos/order.repository";

// ============================== Mocks =================================
import {
  orderItemRepositoryFake,
  productsRepositoryFake,
  orderRepositoryFake,
  userRepositoryFake,
  order,
  user,
  product,
  orderDto,
  orderItem,
  cartDto,
  newOrder,
} from "./mocks/data.mock";

jest.mock("nestjs-i18n", () => ({
  I18nContext: {
      current: () => ({
          t: () => "text",
      }),
  },
}));

describe("Order service", () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: OrderRepository,
          useValue: orderRepositoryFake,
        },
        {
          provide: ProductsRepository,
          useValue: productsRepositoryFake,
        },
        {
          provide: UserRepository,
          useValue: userRepositoryFake,
        },
        {
          provide: OrderItemRepository,
          useValue: orderItemRepositoryFake,
        },
      ],
    }).compile();
    service = module.get<OrderService>(OrderService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("method: Get all orders", () => {
    it("should be return", async () => {
      expect(await service.getAllOrders()).toEqual([order]);
    });
  });

  describe("method: Get orders by id", () => {
    it("should be return specific orders", async () => {
      userRepositoryFake.getById = jest.fn().mockResolvedValue(user);
      expect(await service.getOrdersByUserId(user.id)).toEqual([order]);
    });

    it("should be return error: user not found", async () => {
      userRepositoryFake.getById = jest.fn().mockResolvedValue(false);
      try {
        await service.getOrdersByUserId(user.id);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe("method: Create order", () => {
    it("should be return new order", async () => {
      userRepositoryFake.getById = jest.fn().mockResolvedValue(user);
      orderRepositoryFake.createOrder = jest.fn().mockResolvedValue(newOrder);
      expect(await service.createOrder(cartDto, user.id)).toEqual(orderDto);
    });

    it("should be return error: cart is empty", async () => {
      try {
        const cartDto = {
          id: "23a2cacc-62e8-497c-ab35-34b58af133e5",
          created: 1678979947022,
          updated: 1678979967349,
          items: [],
        };
        await service.createOrder(cartDto, user.id);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });

    it("should be return error: user not found", async () => {
      userRepositoryFake.getById = jest.fn().mockResolvedValue(false);
      try {
        await service.createOrder(cartDto, user.id);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe("method: Create order item", () => {
    it("should be return new order item", async () => {
      expect(await service.createOrderItem(order, product, 20)).toEqual(orderItem);
    });
  });

  describe("method: Get order items by orderId", () => {
    it("should be return order items", async () => {
      expect(await service.getOrderItemByOrderId(order.id)).toEqual([orderItem]);
    })
  })
});
