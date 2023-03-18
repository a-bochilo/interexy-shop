import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "../user.service";
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

describe("User service", () => {
  let service: UserService;

  const mockedRepo = {
    getAllUsers: jest.fn().mockResolvedValue([user]),
    createUser: jest.fn().mockResolvedValue(user),
    getById: jest.fn().mockResolvedValue(user),
    getDetailsById: jest.fn().mockResolvedValue(details),
    assignUserRole: jest.fn().mockResolvedValue(userWithRole),
    updateUserDetails: jest.fn().mockResolvedValue(userWithDetails),
    deleteUserById: jest.fn().mockResolvedValue({ ...user, isActive: false }),
    getUserByEmail: jest.fn().mockResolvedValue(user),
    getUserByPhone: jest.fn().mockResolvedValue(user),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockedRepo)

      .compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("Get user by email", () => {
    it("should be return specififc user", async () => {
      expect(await service.getUserByEmail(user.email)).toEqual(user);
    });

    it("should be return error: user does not exist", async () => {
      try {
        await service.getUserByEmail("uncorrect_email");
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe("Get user by phone", () => {
    it("should be return specififc user", async () => {
      expect(await service.getUserByPhone(user.phone)).toEqual(user);
    });

    it("should be return error: user does not exist", async () => {
      try {
        await service.getUserByPhone("uncorrect_phone");
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe("Get details by id", () => {
    it("should be return specific user details", async () => {
      expect(await service.getDetailsById(user.id)).toEqual(details);
    });

    it("should be return error: user does not exist", async () => {
      try {
        await service.getDetailsById("uncorrect_id");
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe("Get user by id", () => {
    it("should be return specific user", async () => {
      expect(await service.getById(user.id)).toEqual(user);
    });

    it("should be return error: user does not exist", async () => {
      try {
        await service.getById("uncorrect_id");
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
      expect(await service.assignUserRole(dto, user.id)).toEqual(userWithRole);
    });

    it("should be return error: user does not exist", async () => {
      try {
        const dto = {
          newRole: "user",
        };
        await service.assignUserRole(dto, "uncorrect_id");
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it("should be return error: role does not exist", async () => {
      try {
        const dto = {
          newRole: "test",
        };
        await service.assignUserRole(dto, user.id);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe("Delete user by id function", () => {
    it("should be return user with changed field isActive=false", async () => {
      expect(await service.deleteUserById(user.id)).toEqual({
        ...user,
        isActive: false,
      });
    });

    it("should be return error: user does not exist", async () => {
      try {
        await service.deleteUserById("uncorrect_id");
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe("Update user details by id function", () => {
    it("should be return user with changed detais", async () => {
      expect(await service.updateUserDetails(user, user.id)).toEqual(
        userWithDetails
      );
    });

    it("should be return error: user does not exist", async () => {
      try {
        await service.updateUserDetails(user, "uncorrect_id");
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
