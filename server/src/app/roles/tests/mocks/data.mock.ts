import { UserRoles } from "../../../../shared/types/user-roles.enum";
import { UserPermissions } from "../../../../shared/types/user-permissions.enum";
import { HttpStatus } from "@nestjs/common";

export const newUserRole = {
  id: 1,
  created: "2023-03-17T09:31:34.416Z",
  updated: "2023-03-17T09:31:34.416Z",
  type: "user",
  name: "user",
  permissions: ["all"],
};

export const userRoleDto = {
  name: "user",
  type: UserRoles.user,
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
};

export const mockedServices = {
  createRole: jest.fn().mockResolvedValue(newUserRole),
  getRoleByType: jest.fn().mockResolvedValue(newUserRole),
  getAll: jest.fn().mockResolvedValue([newUserRole]),
  getRoleById: jest.fn().mockResolvedValue(newUserRole),
  deleteRole: jest.fn().mockResolvedValue(HttpStatus.OK),
  updateRole: jest.fn().mockResolvedValue(newUserRole),
};
