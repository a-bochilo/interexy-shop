// ============================ nest ====================================
import { Test, TestingModule } from "@nestjs/testing";

// ========================== services & controllers ====================
import { UsersController } from "../user.controller";
import { UsersService } from "../user.service";

// ============================== guards ================================
import { RolesGuard } from "../../security/guards/roles.guard";
import { JwtAuthGuard } from "../../security/guards/jwt-auth.guard";

// ============================== mocks =================================
import {
  mockedServices,
  user,
  details,
  userWithRole,
  userWithDetails,
  userSessionDto,
  userDto,
} from "./mocks/data.mock";

describe("User controller", () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockedServices)

      .overrideGuard(RolesGuard)
      .useValue(true)

      .overrideGuard(JwtAuthGuard)
      .useValue(true)

      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("endpoint: Get all users", () => {
    it("should be return array with users", async () => {
      expect(await controller.getAllUsers(true)).toEqual([userDto]);
    });
  });

  describe("endpoint: Get details by id", () => {
    it("should be return specific user details", async () => {
      expect(await controller.getUserById(user.id)).toEqual(details);
    });
  });

  describe("endpoint: Get user profile by id", () => {
    it("should be return specific user details", async () => {
      expect(await controller.getUserProfile(userSessionDto)).toEqual(details);
    });
  });

  describe("endpoint: Assign user role by id", () => {
    it("should be return user with chahged role", async () => {
      const dto = {
        newRole: "user",
      };
      expect(await controller.assignRoleById(dto, user.id)).toEqual(
        userWithRole
      );
    });
  });

  describe("endpoint: Delete user by id", () => {
    it("should be return user with changed field isActive=false", async () => {
      expect(await controller.deleteUserById(user.id)).toEqual({
        ...user,
        isActive: false,
      });
    });
  });

  describe("endpoint: Update user details by id", () => {
    it("should be return user with changed detais", async () => {
      expect(await controller.updateDetails(user, user.id)).toEqual(
        userWithDetails
      );
    });
  });

  describe("endpoint: Update user profile", () => {
    it("should be return user with changed detais", async () => {
      expect(await controller.updateUserProfile(user, userSessionDto)).toEqual(
        userWithDetails
      );
    });
  });
});
