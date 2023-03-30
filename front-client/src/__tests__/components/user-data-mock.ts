// ========================== types ==========================
import { RolesDto } from "../../app/users/types/roles.dto";
import { UserDetailsDto } from "../../app/users/types/user-details.type";
import { UserDto } from "../../app/users/types/user-dto.type";
import { UserPermissions } from "../../app/users/types/user-permissions.enum";
import { UserRoles } from "../../app/users/types/user-roles.enum";

test.skip("skip", () => {});

export const mockUser: UserDto = {
  id: "6966bd54-fe41-4e92-b15b-4f5fbac9ee1e",
  created: 1679936346070,
  updated: 1679936346070,
  phone: "+375291234567",
  email: "elvis@test.com",
  password: "$2b$05$9TFe4fXQEaoYJNpdniw.O.IIByJncLurM20TWrGquevJlaGzweTy.",
  roleId: 2,
  roleType: UserRoles.user,
  isActive: true,
  details_id: "02e95ec9-1252-4072-b88e-8fb59a2d7d5a",
};

export const mockUserDetails: UserDetailsDto = {
  id: "6966bd54-fe41-4e92-b15b-4f5fbac9ee1e",
  created: 1679936346070,
  updated: 1679936346070,
  firstname: "Peter",
  lastname: "Presley",
  middlename: "Aaron",
};

export const mockUserProfileProps = {
  formName: "user profile",
  user: mockUser,
  userInfo: mockUserDetails,
  disabled: false,
  pending: { user: false, userInfo: false },
  setDisabled: jest.fn(),
  buttonOnclick: jest.fn(),
  handleSave: jest.fn(),
  handleBack: jest.fn(),
};

export const mockUserRoles: RolesDto = {
  id: 2,
  type: UserRoles.user,
  name: "user",
  permissions: [UserPermissions.all],
};

export const mockAssignRoleProps = {
  formName: "user assign role form",
  userId: "6966bd54-fe41-4e92-b15b-4f5fbac9ee1e",
  userRoles: [mockUserRoles],
  isClicked: false,
  selectedUserRole: mockUserRoles,
  disabled: false,
  pending: { users: false, userInfo: false },
  setDisabled: jest.fn(),
  buttonOnclick: jest.fn(),
  handleSave: jest.fn(),
  handleBack: jest.fn(),
};

export const initialState = {
  users: {
    user: [mockUser],
    userInfo: mockUserDetails,
    pending: {
      user: false,
      userInfo: false,
    },
    errors: {
      user: null,
      userInfo: null,
    },
  },
  roles: {
    roles: [
      {
        id: 2,
        type: "user",
        name: "user",
        permissions: [],
      },
    ],
  },
};

export const initialStateWithUserInfoIsNull = {
  users: {
    user: [mockUser],
    userInfo: null,
    pending: {
      user: false,
      userInfo: false,
    },
    errors: {
      user: null,
      userInfo: null,
    },
  },
  roles: {
    roles: [
      {
        id: 2,
        type: "user",
        name: "user",
        permissions: [],
      },
    ],
  },
};

export const mockUserWithDetails = {
  id: "6966bd54-fe41-4e92-b15b-4f5fbac9ee1e",
  firstname: "Peter",
  lastname: "Presley",
  middlename: "Aaron",
  created: 1679936346070,
  updated: 1679936346070,
  email: "elvis@test.com",
  password: "$2b$05$9TFe4fXQEaoYJNpdniw.O.IIByJncLurM20TWrGquevJlaGzweTy.",
  role_id: 2,
  phone: "+375291234567",
  role_type: UserRoles,
  isActive: true,
};
