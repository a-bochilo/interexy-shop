import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "../user.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserRepository } from "../repos/user.repository";
import { RoleRepository } from "../../roles/repos/role.repository";
import { UserDetailsRepository } from "../repos/user-details.repository";
import { UserViewRepository } from "../repos/user-view.repository";

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
  let userRepo: UserRepository;

  const userRepositoryFake = {
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

  const roleRepositoryFake = {
    createRole: jest.fn().mockResolvedValue(role),
    getRoleByType: jest.fn().mockResolvedValue(role),
    getAll: jest.fn().mockResolvedValue([role]),
    getById: jest.fn().mockResolvedValue(role),
    deleteRole: jest.fn().mockResolvedValue(user),
    updateRole: jest.fn().mockResolvedValue(role),
    getRoleByName: jest.fn().mockResolvedValue(role),
  };

  const userViewRepositoryFake = {
    getAllUsers: jest.fn().mockResolvedValue([user]),
    getById: jest.fn().mockResolvedValue(user),
  };

  const userDetailsRepositoryFake = {
    createUserDetails: jest.fn().mockResolvedValue(details),
    deleteDetails: jest.fn().mockResolvedValue(details.id),
    getDetailsById: jest.fn().mockResolvedValue(user.id),
    setDetails: jest.fn().mockResolvedValue(details),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: userRepositoryFake,
        },
        {
          provide: getRepositoryToken(RoleRepository),
          useValue: roleRepositoryFake,
        },
        {
          provide: getRepositoryToken(UserDetailsRepository),
          useValue: userDetailsRepositoryFake,
        },
        {
          provide: getRepositoryToken(UserViewRepository),
          useValue: userViewRepositoryFake,
        },
      ],
    }).compile();
    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("Get user by email", () => {
    it("should be return specififc user", async () => {
      expect(await service.getUserByEmail(user.email)).toEqual(user);
    });

    it("should be return error: user not found", async () => {
      jest.spyOn(service, 'getUserByEmail').mockReturnValueOnce(undefined);
      expect(service.getUserByEmail("")).toBeUndefined();
    })
  });

  describe("Get user by phone", () => {
    it("should be return specififc user", async () => {
      expect(await service.getUserByPhone(user.phone)).toEqual(user);
    });

    it("should be return error: user not found", async () => {
      jest.spyOn(service, 'getUserByPhone').mockReturnValueOnce(undefined);
      expect(service.getUserByPhone("")).toBeUndefined();
    })
  });

  describe("Get user by id", () => {
    it("should be return specific user", async () => {
      expect(await service.getById(user.id)).toEqual(user);
    });

    it("should be return error: user not found", async () => {
      jest.spyOn(service, 'getById').mockReturnValueOnce(undefined);
      expect(service.getById("")).toBeUndefined();
    })
  });

  describe("Assign user role by id", () => {
    const dto = {
      newRole: "user",
    };

    const uncorrectDto = {
      newRole: "UncorrectRole",
    };


    it("should be return user with chahged role", async () => {
      expect(await service.assignUserRole(dto, user.id)).toEqual(userWithRole);
    });

    it("should be return error: user does not exist", async () => {
      jest.spyOn(service, 'assignUserRole').mockReturnValueOnce(undefined);
      expect(service.assignUserRole(dto, "")).toBeUndefined();
    })

    it("should be return error: role does not exist", async () => {
      jest.spyOn(service, 'assignUserRole').mockReturnValueOnce(undefined);
      expect(service.assignUserRole(uncorrectDto, user.id)).toBeUndefined();
    })
  });

  describe("Delete user by id function", () => {
    it("should be return user with changed field isActive=false", async () => {
      const dto = {
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

      expect(await service.deleteUserById(dto.id)).toEqual({
        ...dto,
        isActive: false,
      });
    });

    it("should be return error: user does not exist", async () => {
      jest.spyOn(service, 'deleteUserById').mockReturnValueOnce(undefined);
      expect(service.deleteUserById("")).toBeUndefined();
    })
  });

  describe("Update user details by id function", () => {
    it("should be return user with changed detais", async () => {
      expect(await service.updateUserDetails(user, user.id)).toEqual(
        userWithDetails
      );
    });

    it("should be return error: user does not exist", async () => {
      jest.spyOn(service, 'updateUserDetails').mockReturnValueOnce(undefined);
      expect(service.updateUserDetails(user, '')).toBeUndefined();
    })
  });
});
