import { RoleEntity } from "../../roles/entities/role.entity";
import { UserEntity } from "../../users/entities/user.entity";
import { UserPermissions } from "../../../shared/types/user-permissions.enum";
import { UserRoles } from "../../../shared/types/user-roles.enum";

const date = new Date();

const basicPermissions = [
    UserPermissions.getCart,
    UserPermissions.addCartItem,
    UserPermissions.updateCartItem,
    UserPermissions.deleteCartItem,
    UserPermissions.cleanCart,
    UserPermissions.createOrder,
    UserPermissions.getProfileOrders,
    UserPermissions.getUserProfile,
    UserPermissions.updateUserProfile,
];

export const roleEntity = new RoleEntity();
roleEntity.id = 2;
roleEntity.created = date;
roleEntity.updated = date;
roleEntity.name = "name";
roleEntity.permissions = basicPermissions;
roleEntity.type = UserRoles.user;

export const userEntity = new UserEntity();
userEntity.id = "94ff2989-7ffa-4c2a-bfae-5fa78a751fd5";
userEntity.created = date;
userEntity.updated = date;
userEntity.email = "test@test.com";
userEntity.role = roleEntity;
userEntity.roleId = roleEntity.id;
userEntity.roleType = roleEntity.type;
userEntity.isActive = true;
