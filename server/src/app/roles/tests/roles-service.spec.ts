import { Test, TestingModule } from "@nestjs/testing";
import { RoleService } from "../role.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { RoleRepository } from "../repos/role.repository";
import { UserRoles } from "../../../shared/types/user-roles.enum";
import { HttpException, HttpStatus } from "@nestjs/common";
import { newUserRole, roleRepositoryFake, userRoleDto } from "./mocks/data.mock";

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

  describe("Create role function", () => {
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

  describe("Get role by type function", () => {
    it("should be return specific role", async () => {
      expect(await service.getRoleByType(UserRoles.user)).toEqual(newUserRole);
    });
  });

  describe("Get role by id function", () => {
    it("should be return specific role", async () => {
      expect(await service.getRoleById(1)).toEqual(newUserRole);
    });
  });

  describe("Get all roles function", () => {
    it("should be return array with roles", async () => {
      expect(await service.getAll()).toEqual([newUserRole]);
    });
  });

  describe("Update role function", () => {
    it("should be return new role", async () => {
      expect(await service.updateRole(1, userRoleDto)).toEqual(newUserRole);
    });
  });

  describe("Delete role function", () => {
    it("should be return http status 200", async () => {
      expect(await service.deleteRole(1)).toEqual(HttpStatus.OK);
    });
  });
});