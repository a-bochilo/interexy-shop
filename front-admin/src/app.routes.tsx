import React, { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";


// ========================== components ==========================
import FallbackComponent from "./components/fallback.component";

// ======= private route ======= //
const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
    return true ? (
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

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path={"/"} element={<PublicRoute element={LoginPage} />} />
      <Route path={"products/*"} element={<PublicRoute element={ProductsPage} />} />
      <Route path={"roles/*"} element={<PublicRoute element={RolesPage} />} />
      <Route path={"orders/*"} element={<PublicRoute element={OrdersPage} />} />

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
