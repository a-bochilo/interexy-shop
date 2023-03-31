// ============================ nest ====================================
import { TestingModule, Test } from "@nestjs/testing";
import { HttpStatus } from "@nestjs/common";

// ========================== services & controllers ====================
import { RoleController } from "../role.controller";
import { RoleService } from "../role.service";

// ============================== guards ================================
import { JwtAuthGuard } from "../../security/guards/jwt-auth.guard";
import { RolesGuard } from "../../security/guards/roles.guard";

// ============================== mocks =================================
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
    controller = module.get<RoleController>(RoleController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("endpoint: Create new role", () => {
    it("should be return new role", async () => {
      expect(await controller.createRole(userRoleDto)).toEqual(newUserRole);
    });
  });

  describe("endpoint: Get all roles", () => {
    it("should be return roles array", async () => {
      expect(await controller.getAllRoles()).toEqual([newUserRole]);
    });
  });

  describe("endpoint: Get role by id function", () => {
    it("should be return specific role", async () => {
      expect(await controller.getRoleById(newUserRole.id)).toEqual(newUserRole);
    });
  });

  describe("endpoint: Update role function", () => {
    it("should be return new role", async () => {
      expect(
        await controller.updateRoleById(newUserRole.id, userRoleDto)
      ).toEqual(newUserRole);
    });
  });

  describe("endpoint: Delete role function", () => {
    it("should be return http status 200", async () => {
      expect(await controller.deleteRoleById(1)).toEqual(HttpStatus.OK);
    });
  });
});
