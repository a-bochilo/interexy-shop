// =========================== dto's ========================================
import { OrderItemDto } from "../../app/orders/types/order-item.dto";
import { OrderDto } from "../../app/orders/types/order.dto";

// =========================== enums ========================================
import { IOrdersColumnsTranslate } from "../../app/orders/types/orders-translate.enum";

test.skip("skip", () => {});

// ========================== orders with columns translate ==========================
export const ordersWithColumnsTranslate: IOrdersColumnsTranslate = {
  orderNumber: "4214234124",
  orderCreated: "34234",
  orderTotal: "10",
  product: "qwerty",
  quantity: "10",
  price: "10",
};

// ========================== order ==========================
export const order: OrderDto = {
  created: "2023-03-28T08:02:10.971Z",
  id: "702dc101-653b-4b31-89d5-4d5250efc758",
  total: 294,
  updated: "2023-03-28T08:02:10.971Z",
  user_id: "2de8fc3d-17fa-4a55-8473-6fe989dcd24e",
};

// ========================== order item ==========================
export const orderItem: OrderItemDto = {
  order_id: "25164d5d-dc7d-4c37-9dff-a04854ce7ec6",
  product_id: "4225acc2-d109-49ac-9f75-deb0e33cf79b",
  product_name: "user1223424534345345435",
  product_price: 12,
  product_quantity: 1,
};

// ========================== mock order item ==========================
export const mockOrderItem = {
  created: "2023-03-24T11:50:52.187Z",
  id: "1d6da915-9503-4236-b8fc-b3399809641f",
  order_id: "f825e7b4-be23-41b1-914c-36a8a13ab3c6",
  product_id: "4225acc2-d109-49ac-9f75-deb0e33cf79b",
  product_name: "user1223424534345345435",
  product_price: 12,
  product_quantity: 5,
  updated: "2023-03-24T11:50:52.187Z",
};

// ========================== mock order items ==========================
export const mockOrderItems = [mockOrderItem];
