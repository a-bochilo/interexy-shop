import { UserPermissions } from "../../../../shared/types/user-permissions.enum";
import { UserRoles } from "../../../../shared/types/user-roles.enum"

export const userWithPasswordAndRoleStub = {
    id: 1,
    email: "testmock@test.com",
    password: "123123123",
    details: {
        id: 1,
        firstname: "firstname",
        lastname: "lastname",
        middlename: "middlename",
    },
    role: {
        id: 2,
        type: UserRoles.admin,
        permissions: [UserPermissions.all],
        users: [],
    },
    hashPassword: (): Promise<void> => {
        return new Promise((resolve) => resolve());
    },
};