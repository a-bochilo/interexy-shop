// ========================== enums =====================================
import { UserRoles } from "../../../../shared/types/user-roles.enum";
import { UserPermissions } from "../../../../shared/types/user-permissions.enum";

// ============================ nest ====================================
import { HttpStatus } from "@nestjs/common";

const date = new Date();

export const newUserRole = {
  id: 1,
  created: date,
  updated: date,
  type: "user",
  name: "user",
  permissions: ["all"],
};

export const userRoleDto = {
  name: "user",
  type: UserRoles.user,
  permissions: [UserPermissions.all],
};

export const superadminRoleDto = {
  name: "user",
  type: UserRoles.superadmin,
  permissions: [UserPermissions.all],
};

export const roleRepositoryFake = {
  createRole: jest.fn().mockResolvedValue(newUserRole),
  getRoleByType: jest.fn().mockResolvedValue(newUserRole),
  getAll: jest.fn().mockResolvedValue([newUserRole]),
  getById: jest.fn().mockResolvedValue(newUserRole),
  deleteRole: jest.fn().mockResolvedValue(HttpStatus.OK),
  updateRole: jest.fn().mockResolvedValue(newUserRole),
  getRoleByName: jest.fn().mockResolvedValue(false),
  getRolesByName: jest.fn().mockResolvedValue([newUserRole])
};

export const mockedServices = {
  createRole: jest.fn().mockResolvedValue(newUserRole),
  getRoleByType: jest.fn().mockResolvedValue(newUserRole),
  getAll: jest.fn().mockResolvedValue([newUserRole]),
  getRoleById: jest.fn().mockResolvedValue(newUserRole),
  deleteRole: jest.fn().mockResolvedValue(HttpStatus.OK),
  updateRole: jest.fn().mockResolvedValue(newUserRole),
};
