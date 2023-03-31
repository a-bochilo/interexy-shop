test.skip("skip", () => {});

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

export const mockOrderItems = [mockOrderItem];

// ========================== mock orders with columns translation ==========================
export const ordersWithColumnsTranslate = {
  orderNumber: "4214234124",
  orderCreated: "34234",
  orderTotal: "10",
  product: "qwerty",
  quantity: "10",
  price: "10",
};

// ========================== mock order ==========================
export const order = {
  created: 2023,
  id: "f825e7b4-be23-41b1-914c-36a8a13ab3c6",
  total: 294,
  updated: 2023,
  user_id: "2de8fc3d-17fa-4a55-8473-6fe989dcd24e",
};
