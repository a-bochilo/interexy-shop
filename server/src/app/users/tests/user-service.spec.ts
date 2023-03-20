import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "../user.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserRepository } from "../repos/user.repository";
import { RoleRepository } from "../../roles/repos/role.repository";
import { UserDetailsRepository } from "../repos/user-details.repository";
import { UserViewRepository } from "../repos/user-view.repository";
import { HttpException } from "@nestjs/common";
import {
  userRepositoryFake,
  roleRepositoryFake,
  userDetailsRepositoryFake,
  userViewRepositoryFake,
  user,
  userWithRole,
  userWithDetails,
  details,
  dto,
} from "./mocks/user.mock";

describe("User service", () => {
  let service: UserService;

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

  describe("Get all users", () => {
    it("should be return array with active users", async () => {
      expect(await service.getAllUsers(undefined)).toEqual([user]);
    });
  });

  describe("Get details by id", () => {
    it("should be return specific details", async () => {
      userRepositoryFake.getById = jest.fn().mockResolvedValue(user);
      userDetailsRepositoryFake.getDetailsById = jest
        .fn()
        .mockResolvedValue(details);
      expect(await service.getDetailsById(user.id)).toEqual(details);
    });

    it("should be return error: user not found", async () => {
      userRepositoryFake.getById = jest.fn().mockResolvedValue(false);
      try {
        await service.getDetailsById(user.id);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe("Get user by email", () => {
    it("should be return specififc user", async () => {
      userRepositoryFake.getById = jest.fn().mockResolvedValue(user);
      expect(await service.getUserByEmail(user.email)).toEqual(user);
    });

    it("should be return error: user not found", async () => {
      userRepositoryFake.getUserByEmail = jest.fn().mockResolvedValue(false);
      try {
        await service.getUserByEmail(user.email);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe("Get user by id", () => {
    it("should be return specific user", async () => {
      userRepositoryFake.getById = jest.fn().mockResolvedValue(user);
      expect(await service.getById(user.id)).toEqual(user);
    });

    it("should be return error: user not found", async () => {
      userRepositoryFake.getById = jest.fn().mockResolvedValue(false);
      try {
        await service.getById(user.id);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe("Delete user by id function", () => {
    it("should be return user with changed field isActive=false", async () => {
      userRepositoryFake.getById = jest.fn().mockResolvedValue(user);
      expect(await service.deleteUserById(dto.id)).toEqual({
        ...dto,
        isActive: false,
      });
    });

    it("should be return error: user does not exist", async () => {
      userRepositoryFake.getById = jest.fn().mockResolvedValue(false);
      try {
        await service.deleteUserById(user.id);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe("Assign user role by id", () => {
    const dto = {
      newRole: "user",
    };
    it("should be return user with changed role", async () => {
      userRepositoryFake.getById = jest.fn().mockResolvedValue(user);
      expect(await service.assignUserRole(dto, user.id)).toEqual(userWithRole);
    });
    it("should be return error: user does not exist", async () => {
      userRepositoryFake.getById = jest.fn().mockResolvedValue(false);
      try {
        await service.assignUserRole(dto, user.id);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
    it("should be return error: role does not exist", async () => {
      userRepositoryFake.getById = jest.fn().mockResolvedValue(user);
      roleRepositoryFake.getRoleByName = jest.fn().mockResolvedValue(false);
      try {
        await service.assignUserRole(dto, user.id);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe("Update user details by id function", () => {
    it("should be return user with changed detais", async () => {
      userRepositoryFake.getById = jest.fn().mockResolvedValue(user);
      expect(await service.updateUserDetails(user, user.id)).toEqual(
        userWithDetails
      );
    });

    it("should be return error: user does not exist", async () => {
      userRepositoryFake.getById = jest.fn().mockResolvedValue(false);
      try {
        await service.updateUserDetails(user, user.id);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });

    it("should be return user details", async () => {
      userRepositoryFake.getById = jest.fn().mockResolvedValue(user);
      userDetailsRepositoryFake.getDetailsById = jest
        .fn()
        .mockResolvedValue(false);
      try {
        await service.updateUserDetails(user, user.id);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });
});
