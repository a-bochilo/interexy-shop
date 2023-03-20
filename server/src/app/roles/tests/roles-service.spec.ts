import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { HttpException, HttpStatus } from "@nestjs/common";

// ========================== Services & Controllers ====================
import { RoleService } from "../role.service";

// ============================== Types =================================
import { UserRoles } from "../../../shared/types/user-roles.enum";

// ========================== Repositories ==============================
import { RoleRepository } from "../repos/role.repository";

// ============================== Mocks =================================
import { newUserRole, roleRepositoryFake, userRoleDto } from "./mocks/data.mock";
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

  describe("method: Create role", () => {
    it("should be return error", async () => {
      roleRepositoryFake.getRoleByName = jest.fn().mockResolvedValue(true);
      try {
        await service.createRole(userRoleDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });

    it("should be return new role", async () => {
      roleRepositoryFake.getRoleByName = jest.fn().mockResolvedValue(false);
      expect(await service.createRole(userRoleDto)).toEqual(newUserRole);
    });
  });

  describe("method: Get role by type", () => {
    it("should be return specific role", async () => {
      roleRepositoryFake.getById = jest.fn().mockResolvedValue(role)
      expect(await service.getRoleByType(UserRoles.user)).toEqual(newUserRole);
    });

    it("should be return error", async () => {
      roleRepositoryFake.getById = jest.fn().mockResolvedValue(false)
      try {
        await service.getRoleByType(UserRoles.user)
      } catch(error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe("method: Get role by id", () => {
    it("should be return specific role", async () => {
      roleRepositoryFake.getById = jest.fn().mockResolvedValue(newUserRole)
      expect(await service.getRoleById(1)).toEqual(newUserRole);
    });

    it("should be return error", async () => {
      roleRepositoryFake.getById = jest.fn().mockResolvedValue(false)
      try {
        await service.getRoleById(1)
      } catch(error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe("method: Get all roles", () => {
    it("should be return array with roles", async () => {
      expect(await service.getAll()).toEqual([newUserRole]);
    });
  });

  describe("method: Update role", () => {
    it("should be return new role", async () => {
      roleRepositoryFake.getById = jest.fn().mockResolvedValue(role)
      expect(await service.updateRole(1, userRoleDto)).toEqual(newUserRole);
    });

    it("should be return error", async () => {
      roleRepositoryFake.getById = jest.fn().mockResolvedValue(false)
      try {
        await service.updateRole(1, userRoleDto)
      } catch(error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe("method: Delete role", () => {
    it("should be return http status 200", async () => {
      roleRepositoryFake.getById = jest.fn().mockResolvedValue(role)
      expect(await service.deleteRole(1)).toEqual(HttpStatus.OK);
    });

    it("should be return error", async () => {
      roleRepositoryFake.getById = jest.fn().mockResolvedValue(false)
      try {
        await service.deleteRole(1)
      } catch(error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });
});
