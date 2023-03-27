import { ProductsCategory } from "../../../products/enums/products-category.enum";
import { UserPermissions } from "../../../../shared/types/user-permissions.enum";
import { UserRoles } from "../../../../shared/types/user-roles.enum";

const date = new Date();

export const user = {
    id: "23a2cacc-62e8-497c-ab35-34b58af133e6",
    email: "test@test.com",
    phone: "+375 29 000 00 00",
    created: 1,
    updated: 1,
    role_id: 1,
    isActive: true,
    role_type: UserRoles.admin,
    permissions: [UserPermissions.all],
};

export const details = {
    id: "1",
    created: date,
    updated: date,
    firstname: "testUser",
    lastname: "testUser",
    middlename: "testUser",
};

export const role = {
    id: 1,
    created: date,
    updated: date,
    type: UserRoles.user,
    name: "user",
    permissions: [UserPermissions.all],
};

export const userWithRole = {
    ...user,
    role: role,
};

export const userWithDetails = {
    ...user,
    details: details,
};

export const defaultUser = {
    id: "23a2cacc-62e8-497c-ab35-34b58af133e6",
    created: date,
    updated: date,
    isActive: true,
    email: "test@test.com",
    phone: "+375 29 000 00 00",
    password: "123123123",
    roleId: 1,
    roleType: UserRoles.user,
    details_id: "1",
    cart_id: "1",
    details: details,
    role: role,
};

export const productDetails = {
    id: "1",
    created: date,
    updated: date,
    color: "qwerty",
    material: "qwerty",
    size: "10",
    description: "qwerty",
};

export const product = {
    id: "1",
    created: date,
    updated: date,
    category: ProductsCategory.trousers,
    name: "qwerty",
    brand: "qwerty",
    price: 123,
    image: "qwerty.com",
    isActive: true,
    quantity: 123,
    productsDetailsId: "1",
    productDetails: productDetails,
};

export const orderItem = {
    id: "1",
    created: date,
    updated: date,
    product_name: "qwerty",
    product_price: 123,
    product_quantity: 123,
    product_id: "1",
    product: product,
    order_id: "1",
};

export const order = {
    id: "e040bdee-0780-4200-ac40-82a72d7e2443",
    created: date,
    updated: date,
    total: 123,
    user_id: "23a2cacc-62e8-497c-ab35-34b58af133e6",
    user: defaultUser,
    items: [orderItem],
};

export const orderDto = {
    id: "e040bdee-0780-4200-ac40-82a72d7e2443",
    created: date.valueOf(),
    updated: date.valueOf(),
    total: 123,
    user_id: "23a2cacc-62e8-497c-ab35-34b58af133e6",
};

export const cartDto = {
    id: "9201ad43-7102-4c52-9b9f-b8e72e013d93",
    created: 1679315205204,
    updated: 1679315244163,
    items: [
        {
            id: "19e82606-3077-467a-b8f4-fd7ce28ee41b",
            productId: "19e82606-3077-467a-b8f4-fd7ce28ee41b",
            quantity: 1,
        },
        {
            id: "19e82606-3077-467a-b8f4-fd7ce28ee41b",
            productId: "19e82606-3077-467a-b8f4-fd7ce28ee41b",
            quantity: 1,
        },
    ],
};

export const newOrder = {
    id: "e040bdee-0780-4200-ac40-82a72d7e2443",
    created: "2023-03-20T12:35:59.814Z",
    updated: "2023-03-20T12:35:59.814Z",
    total: 123,
    user_id: "23a2cacc-62e8-497c-ab35-34b58af133e6",
    user: {
        id: "23a2cacc-62e8-497c-ab35-34b58af133e6",
        created: "2023-03-20T12:35:59.814Z",
        updated: "2023-03-20T12:35:59.814Z",
        isActive: true,
        email: "test@test.com",
        phone: "+375 29 000 00 00",
        password: "123123123",
        roleId: 1,
        roleType: "user",
        details_id: "1",
        cart_id: "1",
        details: {
            id: "1",
            created: "2023-03-20T12:35:59.814Z",
            updated: "2023-03-20T12:35:59.814Z",
            firstname: "testUser",
            lastname: "testUser",
            middlename: "testUser",
        },
        role: {
            id: 1,
            created: "2023-03-20T12:35:59.814Z",
            updated: "2023-03-20T12:35:59.814Z",
            type: "user",
            name: "user",
            permissions: [Array],
        },
    },
    items: [
        {
            id: "1",
            created: "2023-03-20T12:35:59.814Z",
            updated: "2023-03-20T12:35:59.814Z",
            product_name: "qwerty",
            product_price: 123,
            product_quantity: 123,
            product_id: "1",
            product: [Object],
            order_id: "1",
        },
    ],
};

export const mockedServices = {
    getAllOrders: jest.fn().mockResolvedValue([order]),
    getOrdersByUserId: jest.fn().mockResolvedValue(order),
    createOrder: jest.fn().mockResolvedValue(order),
    createOrderItem: jest.fn().mockResolvedValue(orderItem),
};

export const orderRepositoryFake = {
    getOneById: jest.fn().mockResolvedValue(order),
    createOrder: jest.fn().mockResolvedValue(orderDto),
    getAllOrders: jest.fn().mockResolvedValue([order]),
    getOrdersByUserId: jest.fn().mockResolvedValue([order]),
    saveOrder: jest.fn().mockResolvedValue(order),
};

export const productsRepositoryFake = {
    getProductById: jest.fn().mockResolvedValue(product),
    createProduct: jest.fn().mockResolvedValue(product),
    getAllProducts: jest.fn().mockResolvedValue([product]),
    getInactiveProducts: jest.fn().mockResolvedValue([product]),
    getFiltredProducts: jest.fn().mockResolvedValue([product]),
    getProductsByName: jest.fn().mockResolvedValue(product),
    updateProduct: jest.fn().mockResolvedValue(product),
    getProductsArrayByIds: jest.fn().mockResolvedValue([product]),
    saveProductsArray: jest.fn().mockResolvedValue([product]),
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

export const orderItemRepositoryFake = {
  createOrderItem: jest.fn().mockResolvedValue(orderItem),
  getOrdersById: jest.fn().mockResolvedValue([orderItem]),
};
