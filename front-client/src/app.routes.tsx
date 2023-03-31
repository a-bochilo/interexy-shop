// ========================== react ==========================
import React, { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

// ========================== components ==========================
import FallbackComponent from "./components/fallback.component";
import { decodeToken } from "react-jwt";

const isAllowed = () => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const user = decodeToken(token);
    if (user) return true;
  }
  return false;
};

// ======= private route ======= //
const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
  return isAllowed() ? (
    <Suspense fallback={<FallbackComponent />}>
      <Element />
    </Suspense>
  ) : (
    <Navigate to={"/"} />
  );
};

// ======= public route ======= //
const PublicRoute: FC<{ element: any }> = ({ element: Element }) => (
  <Suspense fallback={<FallbackComponent />}>
    <Element />
  </Suspense>
);

// ======= pages ======= //
const ProductsPage = React.lazy(() => import("./app/products"));
const CartPage = React.lazy(() => import("./app/cart"));
const AuthPage = React.lazy(() => import("./app/auth"));
const OrdersPage = React.lazy(() => import("./app/orders"));
const UserPage = React.lazy(() => import("./app/users"));

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path={"products/*"} element={<PublicRoute element={ProductsPage} />} />
      <Route path={"auth/*"} element={<PublicRoute element={AuthPage} />} />

      {/* PRIVATE */}
      <Route path={"cart/*"} element={<PrivateRoute element={CartPage} />} />
      <Route path={"profile/*"} element={<PrivateRoute element={UserPage} />} />
      <Route path={"orders/*"} element={<PrivateRoute element={OrdersPage} />} />

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/products" />} />
    </Routes>
  );
};

export default AppRoutes;
