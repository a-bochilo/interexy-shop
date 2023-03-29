// ========================== react ==========================
import { render, act, waitFor } from "@testing-library/react";

// ========================== types ==========================
import { RolesDto } from "../app/roles/types/roles.dto";
import { UserRoles } from "../app/users/types/user-roles.type";
import { UserPermissions } from "../app/roles/types/user-permissions.enum";
import UserAssignRoleFormComp from "./user-assign-role-form.comp";

describe("User assign role form component",  () => {

  
  const mockUserRoles: RolesDto = {
    id: 2,
    type: UserRoles.user,
    name: "user",
    permissions: [UserPermissions.all],
  };

  const mockProps = {
    formName: "user assign role form",
    userId: "6966bd54-fe41-4e92-b15b-4f5fbac9ee1e",
    userRoles: [mockUserRoles],
    isClicked: false,
    selectedUserRole: mockUserRoles,
    disabled: false,
    pending: { users: false, userInfo: false },
    setDisabled: () => true,
    buttonOnclick: () => undefined,
    handleSave: () => undefined,
    handleBack: () => undefined,
  };

  it("should renders", async () => {
    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      render(<UserAssignRoleFormComp {...mockProps} />);
    });
  
    
  });
});
