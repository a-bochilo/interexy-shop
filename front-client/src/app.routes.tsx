// ========================== react ==========================
import React, { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

// ======= private route ======= //
const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
  return true ? (
    <Suspense fallback={<h2>🌀 Loading...</h2>}>
      <div>
        <Element />
      </div>
    </Suspense>
  ) : (
    <Navigate to={"/"} />
  );
};

// ======= public route ======= //
const PublicRoute: FC<{ element: any }> = ({ element: Element }) => (
  <Suspense fallback={<h2>🌀 Loading...</h2>}>
    <Element />
  </Suspense>
);

// ======= pages ======= //
const ProductsPage = React.lazy(() => import("./app/products"));

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path={"/"} element={<PublicRoute element={ProductsPage} />} />

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
