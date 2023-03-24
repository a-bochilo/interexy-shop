import React, { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

// ========================== mui ==========================
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import OrdersPage from "./app/orders";

// ======= private route ======= //
const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
  return true ? (
    <Suspense
      fallback={
        <Box
          sx={{
            display: "flex",
            minHeight: "100vh",
            minWidth: "100vw",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      }
    >
      <Element />
    </Suspense>
  ) : (
    <Navigate to={"/"} />
  );
};

// ======= public route ======= //
const PublicRoute: FC<{ element: any }> = ({ element: Element }) => (
  <Suspense
    fallback={
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          minWidth: "100vw",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    }
  >
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
