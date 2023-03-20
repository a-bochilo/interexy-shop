import { UserEntity } from "../../../../app/users/entities/user.entity";
import { UserPermissions } from "../../../../shared/types/user-permissions.enum";
import { UserRoles } from "../../../../shared/types/user-roles.enum";
import { CartSessionDto } from "../../dtos/cart-session.dto";

const date = new Date();

export const cartWithExtraItemDto: CartSessionDto = {
    id: "39357c86-29d3-4df0-a1e0-ef0626d0d877",
    created: date.valueOf(),
    updated: date.valueOf(),
    items: [
        {
            productId: "d5232d45-99e6-40ca-83fc-3ead715c5fdc",
            quantity: 10,
        },
        {
            productId: "7407b231-5815-466f-ae00-be88c8927719",
            quantity: 15,
        },
    ],
};

export const cartItemEntity = {
    id: "39357c86-29d3-4df0-a1e0-ef0626d0d877",
    created: date,
    updated: date,
    product_id: "d5232d45-99e6-40ca-83fc-3ead715c5fdc",
    cart_id: "39357c86-29d3-4df0-a1e0-ef0626d0d877",
    quantity: 10,
    cart: cartEntity,
};

export const cartItemEntity2 = {
    id: "c5d5dd16-c453-4c72-800b-01692c9dcc05",
    created: date,
    updated: date,
    product_id: "d5232d45-99e6-40ca-83fc-3ead715c5fdc",
    cart_id: "39357c86-29d3-4df0-a1e0-ef0626d0d877",
    quantity: 10,
    cart: cartEntity,
};

export const cartItemDtoExisted = {
    id: "39357c86-29d3-4df0-a1e0-ef0626d0d877",
    created: date,
    updated: date,
    productId: "d5232d45-99e6-40ca-83fc-3ead715c5fdc",
    quantity: 10,
};

export const cartItemDto = {
    id: "39357c86-29d3-4df0-a1e0-ef0626d0d877",
    created: date,
    updated: date,
    productId: "7407b231-5815-466f-ae00-be88c8927719",
    quantity: 15,
};

export const userSessionDto = {
    id: "94ff2989-7ffa-4c2a-bfae-5fa78a751fd5",
    email: "test@test.com",
    role_id: 2,
    role_type: UserRoles.user,
    created: date.valueOf(),
    updated: date.valueOf(),
    cart_id: "39357c86-29d3-4df0-a1e0-ef0626d0d877",
    isActive: true,
    permissions: [
        UserPermissions.getCart,
        UserPermissions.addCartItem,
        UserPermissions.updateCartItem,
        UserPermissions.deleteCartItem,
        UserPermissions.cleanCart,
        UserPermissions.createOrder,
        UserPermissions.getProfileOrders,
        UserPermissions.getUserProfile,
        UserPermissions.updateUserProfile,
    ],
};

const createdUserEnity = new UserEntity();
Object.assign(createdUserEnity, userSessionDto);
export const userEntity = createdUserEnity;

export var cartEntity = {
    id: "39357c86-29d3-4df0-a1e0-ef0626d0d877",
    created: date,
    updated: date,
    items: [cartItemEntity],
    userId: userEntity.id,
    user: userEntity,
};

export var cartEntityWithExtraItem = {
    id: "39357c86-29d3-4df0-a1e0-ef0626d0d877",
    created: date,
    updated: date,
    items: [cartItemEntity, cartItemEntity2],
    userId: userEntity.id,
    user: userEntity,
};

export const product = {
    id: "d5232d45-99e6-40ca-83fc-3ead715c5fdc",
    quantity: 30,
};
