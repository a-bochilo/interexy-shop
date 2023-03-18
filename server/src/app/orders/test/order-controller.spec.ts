import { RolesGuard } from "../../security/guards/roles.guard";
import { OrderController } from "../order.controller";
import { JwtAuthGuard } from "../../security/guards/jwt-auth.guard";
import { OrderService } from "../order.service";
import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException } from "@nestjs/common";

const user = {
  id: "23a2cacc-62e8-497c-ab35-34b58af133e6",
  created: "2023-03-17T09:31:34.416Z",
  updated: "2023-03-17T09:31:34.416Z",
  isActive: true,
  email: "test@test.com",
  phone: "+375 29 000 00 00",
  password: "123123123",
  roleId: 1,
  roleType: "user",
  details_id: "1",
};

const cart = {
  items: [{ productId: "adfa44-2klasdfa", quantity: 4 }],
};

const order = {
  id: "e040bdee-0780-4200-ac40-82a72d7e2443",
  created: 1678979947022,
  updated: 1678979967349,
  items: [
    {
      productId: "9b6b613e-6b26-4622-9e43-03c884b4a3ee",
      quantity: 2550,
    },
  ],
};

describe("Order controller", () => {
  let controller: OrderController;

  const mockedServices = {
    createOrder: jest.fn().mockResolvedValue(order),
    getAllOrders: jest.fn().mockResolvedValue([order]),
    getOrdersByUserId: jest.fn().mockResolvedValue(order),
  };

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

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("Get all orders function", () => {
    it("should be return array with orders", async () => {
      expect(await controller.getAllOrders()).toEqual([order]);
    });
  });

  describe("Get user orders by id", () => {
    it("should be return array with orders", async () => {
      expect(await controller.getOrdersByUserId(user.id)).toEqual(order);
    });

    it("should be return error: user does not exist", async () => {
        try {
          await controller.getOrdersByUserId("uncorrect_id");
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
        }
      });
  });

});
