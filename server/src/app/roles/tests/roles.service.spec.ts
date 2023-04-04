// ============================ nest ====================================
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { HttpException, HttpStatus } from "@nestjs/common";

// ========================== services & controllers ====================
import { RoleService } from "../role.service";

// ============================== types =================================
import { UserRoles } from "../../../shared/types/user-roles.enum";

// ========================== repositories ==============================
import { RoleRepository } from "../repos/role.repository";

// ============================== mocks =================================
import {
  newUserRole,
  roleRepositoryFake,
  superadminRoleDto,
  userRoleDto,
} from "./mocks/data.mock";
import { role } from "../../orders/test/mocks/data.mock";

jest.mock("nestjs-i18n", () => ({
  I18nContext: {
    current: () => ({
      t: () => "text",
    }),
  },
}));

describe("Roles services", () => {
  let service: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(RoleRepository),
          useValue: roleRepositoryFake,
        },
      ],
    }).compile();
    service = module.get<RoleService>(RoleService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("method: Get all roles", () => {
    it("should be return array with roles", async () => {
      expect(await service.getAll()).toEqual([newUserRole]);
    });
  });

  describe("method: Create role", () => {
    it("should be return new role", async () => {
      roleRepositoryFake.getRoleByName = jest.fn().mockResolvedValue(false);
      expect(await service.createRole(newUserRole)).toEqual(newUserRole);
    });

    it("should be return error: Role does not exist", async () => {
      roleRepositoryFake.getRoleByName = jest.fn().mockResolvedValue(true);
      try {
        await service.createRole(newUserRole);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });

    it("should be return error: Limit on creating a superuser role", async () => {
      roleRepositoryFake.getRoleByName = jest.fn().mockResolvedValue(false);
      try {
        await service.createRole(superadminRoleDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe("method: Get role by type", () => {
    it("should be return specific role", async () => {
      roleRepositoryFake.getById = jest.fn().mockResolvedValue(role);
      expect(await service.getRoleByType(UserRoles.user)).toEqual(newUserRole);
    });

    it("should be return error", async () => {
      roleRepositoryFake.getRoleByType = jest.fn().mockResolvedValue(false);
      try {
        await service.getRoleByType(UserRoles.user);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe("method: Get role by id", () => {
    it("should be return specific role", async () => {
      roleRepositoryFake.getById = jest.fn().mockResolvedValue(newUserRole);
      expect(await service.getRoleById(role.id)).toEqual(newUserRole);
    });

    it("should be return error", async () => {
      roleRepositoryFake.getById = jest.fn().mockResolvedValue(false);
      try {
        await service.getRoleById(role.id);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe("method: Update role", () => {
    it("should be return new role", async () => {
      roleRepositoryFake.getById = jest.fn().mockResolvedValue(role);
      expect(await service.updateRole(role.id, userRoleDto)).toEqual(
        newUserRole
      );
    });

    it("should be return error", async () => {
      roleRepositoryFake.getById = jest.fn().mockResolvedValue(false);
      try {
        await service.updateRole(role.id, userRoleDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });

    it("should be return error: Limit on creating a superuser role", async () => {
      roleRepositoryFake.getById = jest
        .fn()
        .mockResolvedValue({ ...role, type: UserRoles.superadmin });
      try {
        await service.updateRole(role.id, userRoleDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe("method: Delete role", () => {
    it("should be return http status 200", async () => {
      roleRepositoryFake.getById = jest.fn().mockResolvedValue(role);
      expect(await service.deleteRole(role.id)).toEqual(HttpStatus.OK);
    });

    it("should be return error", async () => {
      roleRepositoryFake.getById = jest.fn().mockResolvedValue(false);
      try {
        await service.deleteRole(role.id);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });

    it("should be return error: Limit on deleting a superuser role", async () => {
      roleRepositoryFake.getById = jest
        .fn()
        .mockResolvedValue({ ...role, type: UserRoles.superadmin });
      try {
        await service.deleteRole(role.id);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });
});
