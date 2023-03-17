export enum UserPermissions {
  all = "all",

  //============================================PRODUCTS============================================
  createProduct = "createProduct",
  updateProduct = "updateProduct",
  deleteProduct = "deleteProduct",

  //==============================================USERS==============================================
  getAllUsers = "getAllUsers",
  getUserProfile = "getUserProfile",
  updateUserProfile = "updateUserProfile",
  getUserById = "getUserById",
  updateDetails = "updateDetails",
  deleteUserById = "deleteUserById",
  assignRoleById = "assignRoleById",

  //==============================================ROLES==============================================
  createRole = "createRole",
  getAllRoles = "getAllRoles",
  getRoleById = "getRoleById",
  deleteRoleById = "deleteRoleById",
  updateRoleById = "updateRoleById",

  //==============================================CARTS==============================================
  getCart = "getCart",
  addCartItem = "addCartItem",
  updateCartItem = "updateCartItem",
  deleteCartItem = "deleteCartItem",
  cleanCart = "cleanCart",

  //==============================================ORDERS==============================================
  createOrder = "createOrder",
  getProfileOrders = "getProfileOrders",
  getAllOrders = "getAllOrders",
  getOrdersByUserId = "getOrdersByUserId",
}
