import { UserController } from "../user.controller";
import { UserService } from "../user.service";
import { Test, TestingModule } from "@nestjs/testing";
import { RolesGuard } from "../../security/guards/roles.guard";
import { JwtAuthGuard } from "../../security/guards/jwt-auth.guard";
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

describe("User controller", () => {
  let controller: UserController;

  const mockedServices = {
    getAllUsers: jest.fn().mockResolvedValue([user]),
    getDetailsById: jest.fn().mockResolvedValue(details),
    assignUserRole: jest.fn().mockResolvedValue(userWithRole),
    deleteUserById: jest.fn().mockResolvedValue({ ...user, isActive: false }),
    updateUserDetails: jest.fn().mockResolvedValue(userWithDetails),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockedServices)

      .overrideGuard(RolesGuard)
      .useValue(true)

      .overrideGuard(JwtAuthGuard)
      .useValue(true)

      .compile();

    controller = module.get<UserController>(UserController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("Get all users function", () => {
    it("should be return array with users", async () => {
      expect(await controller.getAllUsers(true)).toEqual([user]);
    });
  });

  describe("Get details by id function", () => {
    it("should be return specific user details", async () => {
      expect(await controller.getUserById(user.id)).toEqual(details);
    });

    it("should be return error: user does not exist", async () => {
      try {
        await controller.getUserById("uncorrect_id");
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe("Assigne user role by id", () => {
    it("should be return user with chahged role", async () => {
      const dto = {
        newRole: "user",
      };
      expect(await controller.assignRoleById(dto, user.id)).toEqual(
        userWithRole
      );
    });

    it("should be return error: user does not exist", async () => {
      try {
        const dto = {
          newRole: "user",
        };
        await controller.assignRoleById(dto, "uncorrect_id");
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it("should be return error: role does not exist", async () => {
      try {
        const dto = {
          newRole: "test",
        };
        await controller.assignRoleById(dto, user.id);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe("Delete user by id function", () => {
    it("should be return user with changed field isActive=false", async () => {
      expect(await controller.deleteUserById(user.id)).toEqual({
        ...user,
        isActive: false,
      });
    });

    it("should be return error: user does not exist", async () => {
      try {
        await controller.deleteUserById("uncorrect_id");
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe("Update user details by id function", () => {
    it("should be return user with changed detais", async () => {
      expect(await controller.updateDetails(user, user.id)).toEqual(userWithDetails);
    });

    it("should be return error: user does not exist", async () => {
      try {
        await controller.updateDetails(user, "uncorrect_id");
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
