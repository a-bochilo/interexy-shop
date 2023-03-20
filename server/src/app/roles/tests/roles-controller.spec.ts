import { TestingModule, Test } from "@nestjs/testing";
import { RoleController } from "../role.controller";
import { RoleService } from "../role.service";
import { JwtAuthGuard } from "../../security/guards/jwt-auth.guard";
import { RolesGuard } from "../../security/guards/roles.guard";
import { HttpStatus } from "@nestjs/common";
import { mockedServices, userRoleDto, newUserRole } from "./mocks/data.mock";

describe("Roles controller", () => {
  let controller: RoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [RoleService],
    })
      .overrideProvider(RoleService)
      .useValue(mockedServices)

      .overrideGuard(RolesGuard)
      .useValue(true)

      .overrideGuard(JwtAuthGuard)
      .useValue(true)

      .compile();
      controller = module.get<RoleController>(RoleController)
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("Create new role", () => {
    it("should be return new role", async () => {
      expect(await controller.createRole(userRoleDto)).toEqual(newUserRole);
    });
  })

  describe("Get all roles", () => {
    it("should be return roles array", async () => {
      expect(await controller.getAllRoles()).toEqual([newUserRole]);
    });
  });

  describe("Get role by id function", () => {
    it("should be return specific role", async () => {
      expect(await controller.getRoleById(newUserRole.id)).toEqual(newUserRole);
    });
})

describe("Update role function", () => {
    it("should be return new role", async () => {
      expect(await controller.updateRoleById(newUserRole.id, userRoleDto)).toEqual(newUserRole);
    });
})

describe('Delete role function', () => {
  it("should be return http status 200", async () => {
    expect(await controller.deleteRoleById(1)).toEqual(HttpStatus.OK);
  })
})
});


























/*

const user = {
  id: "23a2cacc-62e8-497c-ab35-34b58af133e6",
  email: "test@test.com",
  phone: "+375 29 000 00 00",
  created: 1678979947022,
  updated: 1678979967349,
  role_id: 1,
  isActive: true,
  role_type: UserRoles.admin,
  permissions: [UserPermissions.all],
};

const cart = {
  id: "23a2cacc-62e8-497c-ab35-34b58af133e5",
  created: 1678979947022,
  updated: 1678979967349,
  items: [{ productId: "adfa44-2klasdfa", quantity: 4 }],
};

const order = {
  id: "e040bdee-0780-4200-ac40-82a72d7e2443",
  created: 1678979947022,
  updated: 1678979967349,
  total: 123,
  user_id: "23a2cacc-62e8-497c-ab35-34b58af133e6" ,
  user: user,
  items: [
    {
      productId: "9b6b613e-6b26-4622-9e43-03c884b4a3ee",
      quantity: 2550,
    },
  ],
};

const productDetails = {
    color: "qwerty",
    material: "qwerty",
    size: "10",
    description: "qwerty",
}

const product = {
    category: ProductsCategory.trousers,
    name: "qwerty",
    brand: "qwerty",
    price: 123,
    image: "qwerty.com",
    isActive: true,
    quantity: 123,
    productsDetailsId: "1",
    productDetails: productDetails,
}

const orderItem = {
    product_name: "qwerty",
    product_price: 123,
    product_quantity: 123,
    product_id: "1",
    product: product,
    order_id: "1",
    order: order,
};

const details = {
  id: "1",
  created: "2023-03-17T09:31:34.416Z",
  updated: "2023-03-17T09:31:34.416Z",
  firstname: "testUser",
  lastname: "testUser",
  middlename: "testUser",
};

const role = {
  id: 1,
  created: "2023-03-17T09:31:34.416Z",
  updated: "2023-03-17T09:31:34.416Z",
  type: "user",
  name: "user",
  permissions: [
    "getCart",
    "addCartItem",
    "updateCartItem",
    "deleteCartItem",
    "cleanCart",
    "createOrer",
    "getProfileOrgers",
    "getUserProfile",
    "updateUserProfile",
  ],
};

const userWithRole = {
  ...user,
  role: role,
};

const userWithDetails = {
  ...user,
  details: details,
};

*/