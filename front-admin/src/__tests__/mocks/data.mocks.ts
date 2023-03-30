import { OrderItemDto } from "../../app/orders/types/order-item.dto";
import { OrderDto } from "../../app/orders/types/order.dto";
import { UserPermissions } from "../../app/roles/types/user-permissions.enum";
import { UserRoles } from "../../app/roles/types/user-roles.enum";

test.skip("skip", () => {});

export type IFormInput = {
  email: string;
  password: string;
  phone?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
};

export interface ISignUpTemplate {
  email: string;
  password: string;
  phone?: string;
  details: {
    firstname: string;
    middlename?: string;
    lastname: string;
  };
}

export const ordersWithColumnsTranslate = {
  orderNumber: "4214234124",
  orderCreated: "34234",
  orderTotal: "10",
  product: "qwerty",
  quantity: "10",
  price: "10",
};

export const order: OrderDto = {
  created: 2023,
  id: "f825e7b4-be23-41b1-914c-36a8a13ab3c6",
  total: 294,
  updated: 2023,
  user_id: "2de8fc3d-17fa-4a55-8473-6fe989dcd24e",
};

export const orderItem: OrderItemDto = {
  order_id: "25164d5d-dc7d-4c37-9dff-a04854ce7ec6",
  product_id: "4225acc2-d109-49ac-9f75-deb0e33cf79b",
  product_name: "user1223424534345345435",
  product_price: 12,
  product_quantity: 1,
};

export const authWithTranslate = {
  login: "Login",
  email: "Email",
  password: "Password",
  confirmPassword: "Confirm password",
  signIn: "Sign In",
  signUp: "Sign Up",
  firstName: "First name",
  middleName: "Middle name",
  lastName: "Last name",
  phone: "Phone",
};

export const mockRegisterData = {
  firstname: "some",
  middlename: "some",
  lastname: "some",
  email: "example@mail.com",
  password: "111111",
  confirmPassword: "111111",
  phone: "+375291111231",
};

export const FormSignInInput = {
  email: "test@test.com",
  password: "123123123",
};

export const initialState = {
  auth: {
    token: "",
    errors: {
      token: null,
    },
    pending: {
      token: false,
    },
  },
};

export const role = {
  id: 1,
  type: UserRoles.user,
  name: "user",
  permissions: [UserPermissions.all],
};

export const mockOrderItems = [
  {
    created: "2023-03-24T11:50:52.187Z",
    id: "1d6da915-9503-4236-b8fc-b3399809641f",
    order_id: "f825e7b4-be23-41b1-914c-36a8a13ab3c6",
    product_id: "4225acc2-d109-49ac-9f75-deb0e33cf79b",
    product_name: "user1223424534345345435",
    product_price: 12,
    product_quantity: 5,
    updated: "2023-03-24T11:50:52.187Z",
  },
];
