// ========================== enums =====================================
import { UserPermissions } from "../../../../shared/types/user-permissions.enum";
import { UserRoles } from "../../../../shared/types/user-roles.enum";

export const user = {
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

export const userDto = {
  created: "2023-03-17T09:31:34.416Z",
  email: "test@test.com",
  id: "23a2cacc-62e8-497c-ab35-34b58af133e6",
  phone: "+375 29 000 00 00",
  role_id: 1,
  role_type: "user",
  updated: "2023-03-17T09:31:34.416Z",
};

export const userSessionDto = {
  id: "23a2cacc-62e8-497c-ab35-34b58af133e6",
  created: 20230317,
  updated: 20230317,
  isActive: true,
  email: "test@test.com",
  phone: "+375 29 000 00 00",
  password: "123123123",
  details_id: "1",
  role_id: 1,
  role_type: UserRoles.user,
  permissions: [UserPermissions.all],
};

export const dto = {
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

export const details = {
  id: "1",
  created: "2023-03-17T09:31:34.416Z",
  updated: "2023-03-17T09:31:34.416Z",
  firstname: "testUser",
  lastname: "testUser",
  middlename: "testUser",
};

export const role = {
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

export const userWithRole = {
  ...user,
  role: role,
};

export const userWithDetails = {
  ...user,
  details: details,
};

export const mockedServices = {
  getAllUsers: jest.fn().mockResolvedValue([user]),
  getDetailsById: jest.fn().mockResolvedValue(details),
  assignUserRole: jest.fn().mockResolvedValue(userWithRole),
  deleteUserById: jest.fn().mockResolvedValue({ ...user, isActive: false }),
  updateUserDetails: jest.fn().mockResolvedValue(userWithDetails),
};

export const userRepositoryFake = {
  getAllUsers: jest.fn().mockResolvedValue([user]),
  createUser: jest.fn().mockResolvedValue(user),
  getById: jest.fn().mockResolvedValue(user),
  getDetailsById: jest.fn().mockResolvedValue(details),
  assignUserRole: jest.fn().mockResolvedValue(userWithRole),
  updateUserDetails: jest.fn().mockResolvedValue(userWithDetails),
  deleteUserById: jest.fn().mockResolvedValue({ ...user, isActive: false }),
  getUserByEmail: jest.fn().mockResolvedValue(user),
};

export const roleRepositoryFake = {
  createRole: jest.fn().mockResolvedValue(role),
  getRoleByType: jest.fn().mockResolvedValue(role),
  getAll: jest.fn().mockResolvedValue([role]),
  getById: jest.fn().mockResolvedValue(role),
  deleteRole: jest.fn().mockResolvedValue(user),
  updateRole: jest.fn().mockResolvedValue(role),
  getRoleByName: jest.fn().mockResolvedValue(role),
};

export const userViewRepositoryFake = {
  getAllUsers: jest.fn().mockResolvedValue([user]),
  getById: jest.fn().mockResolvedValue(user),
};

export const userDetailsRepositoryFake = {
  createUserDetails: jest.fn().mockResolvedValue(details),
  deleteDetails: jest.fn().mockResolvedValue(details.id),
  getDetailsById: jest.fn().mockResolvedValue(user.id),
  setDetails: jest.fn().mockResolvedValue(details),
};
