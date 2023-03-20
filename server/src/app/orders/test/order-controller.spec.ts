import { Test, TestingModule } from "@nestjs/testing";

// ========================== Services & Controllers ====================
import { OrderController } from "../order.controller";
import { OrderService } from "../order.service";

// ============================== Guards ================================
import { JwtAuthGuard } from "../../security/guards/jwt-auth.guard";
import { RolesGuard } from "../../security/guards/roles.guard";

// ============================== Mocks =================================
import { cartDto, mockedServices, order, user } from "./mocks/data.mock";


describe("Order controller", () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue(mockedServices)

      .overrideGuard(RolesGuard)
      .useValue(true)

      .overrideGuard(JwtAuthGuard)
      .useValue(true)

      .compile();
    controller = module.get<OrderController>(OrderController);
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
});
