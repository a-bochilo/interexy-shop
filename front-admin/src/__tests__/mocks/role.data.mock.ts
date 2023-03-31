// ========================== enum ==========================
import { UserPermissions } from "../../app/roles/types/user-permissions.enum";
import { UserRoles } from "../../app/roles/types/user-roles.enum";

test.skip("skip", () => {});

export const role = {
  id: 1,
  type: UserRoles.user,
  name: "user",
  permissions: [UserPermissions.all],
};
