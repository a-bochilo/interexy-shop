// ========================== react ==========================
import React, { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { decodeToken } from "react-jwt";

// ========================== components ==========================
import FallbackComponent from "./components/fallback.component";
import OrdersPage from "./app/orders";

// ========================== enum ==========================
import { UserRoles } from "./app/roles/types/user-roles.enum";

interface User {
  roleType: UserRoles;
}

const isAllowed = () => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const user: User | null = decodeToken(token);
    if (user !== null && user.roleType !== UserRoles.user) return true;
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
const LoginPage = React.lazy(() => import("./app/login"));
const ProductsPage = React.lazy(() => import("./app/products"));
const RolesPage = React.lazy(() => import("./app/roles"));
const UsersPage = React.lazy(() => import("./app/users"));

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path={"/"} element={<PublicRoute element={LoginPage} />} />

      {/* PRIVATE */}
      <Route
        path={"products/*"}
        element={<PrivateRoute element={ProductsPage} />}
      />
      <Route path={"roles/*"} element={<PrivateRoute element={RolesPage} />} />
      <Route
        path={"orders/*"}
        element={<PrivateRoute element={OrdersPage} />}
      />
      <Route path={"/users/*"} element={<PrivateRoute element={UsersPage} />} />

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
