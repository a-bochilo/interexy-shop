// ============================ nest ====================================
import { Test, TestingModule } from "@nestjs/testing";

// ========================== services & controllers ====================
import { OrdersController } from "../order.controller";
import { OrdersService } from "../order.service";

// ============================== guards ================================
import { JwtAuthGuard } from "../../security/guards/jwt-auth.guard";
import { RolesGuard } from "../../security/guards/roles.guard";

// ============================== mocks =================================
import {
  cartDto,
  mockedServices,
  order,
  orderItem,
  user,
} from "./mocks/data.mock";

describe("Order controller", () => {
  let controller: OrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService],
    })
      .overrideProvider(OrdersService)
      .useValue(mockedServices)

      .overrideGuard(RolesGuard)
      .useValue(true)

      .overrideGuard(JwtAuthGuard)
      .useValue(true)

      .compile();
    controller = module.get<OrdersController>(OrdersController);
  });

  it("should be defined", async () => {
    expect(controller).toBeDefined();
  });

  describe("endpoint: Create order", () => {
    it("should be return new order", async () => {
      expect(await controller.createOrder(user, cartDto));
    });
  });

  describe("endpoint: Get orders by user_id", () => {
    it("should be return order", async () => {
      expect(await controller.getProfileOrders(user)).toEqual(order);
    }),
      it("should be return order", async () => {
        expect(await controller.getOrdersByUserId(user.id)).toEqual(order);
      });
  });

  describe("endpoint: Get all orders", () => {
    it("should be return all orders", async () => {
      expect(await controller.getAllOrders()).toEqual([order]);
    });
  });

  describe("endpoint: Get order item by order id", () => {
    it("should be return all order items", async () => {
      expect(await controller.getOrderItemByOrderId(order.id)).toEqual([
        orderItem,
      ]);
    });
  });
});
