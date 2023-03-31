export enum UserPermissions {
  //========================== all ===============================
  all = "all",

  //========================== products ==========================
  createProduct = "createProduct",
  updateProduct = "updateProduct",
  deleteProduct = "deleteProduct",

  //========================== users =============================
  getAllUsers = "getAllUsers",
  getUserProfile = "getUserProfile",
  updateUserProfile = "updateUserProfile",
  getUserById = "getUserById",
  updateDetails = "updateDetails",
  deleteUserById = "deleteUserById",
  assignRoleById = "assignRoleById",

  //========================== roles ===============================
  createRole = "createRole",
  getAllRoles = "getAllRoles",
  getRoleById = "getRoleById",
  deleteRoleById = "deleteRoleById",
  updateRoleById = "updateRoleById",

  //========================== carts ===============================
  getCart = "getCart",
  addCartItem = "addCartItem",
  updateCartItem = "updateCartItem",
  deleteCartItem = "deleteCartItem",
  cleanCart = "cleanCart",

  //========================== orders ===============================
  createOrder = "createOrder",
  getProfileOrders = "getProfileOrders",
  getAllOrders = "getAllOrders",
  getOrdersByUserId = "getOrdersByUserId",
  getOrderItemByOrderId = "getOrderItemByOrderId",

  //========================== security =============================
  refreshToken = "refreshToken",
}
