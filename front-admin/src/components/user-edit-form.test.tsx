// ========================== react ==========================
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UserDetailsDto } from "../app/users/types/user-details.type";

// ========================== comp, types ==========================
import { UserDto } from "../app/users/types/user-dto.type";
import { UserRoles } from "../app/users/types/user-roles.type";
import UserEditFormComp from "./user-edit-form.comp";

describe("User edit form", () => {
  const mockUser: UserDto = {
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

  const mockUserDetails: UserDetailsDto = {
    id: "6966bd54-fe41-4e92-b15b-4f5fbac9ee1e",
    firstname: "Peter",
    lastname: "Presley",
    middlename: "Aaron",
  };

  const mockProps = {
    formName: "user edit form",
    selectedUser: mockUser,
    userInfo: mockUserDetails,
    disabled: false,
    pending: { users: false, userInfo: false },
    setDisabled: () => true,
    buttonOnclick: () => undefined,
    handleSave: () => undefined,
    handleDelete: () => undefined,
    handleBack: () => undefined,
    handleAsignRole: () => undefined,
  };

  it("should renders", async () => {
    render(<UserEditFormComp {...mockProps} />);
  });
});
