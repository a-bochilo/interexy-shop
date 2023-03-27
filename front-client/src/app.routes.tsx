// ========================== react ==========================
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

// ========================== components ==========================
import FallbackComponent from "./components/fallback.component";

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
const ProductsPage = React.lazy(() => import("./app/products"));
const CartPage = React.lazy(() => import("./app/cart"));
const AuthPage = React.lazy(() => import("./app/auth"));
const OrdersPage = React.lazy(() => import("./app/orders"));
const UserPage = React.lazy(() => import("./app/users"));

const AppRoutes = () => {
    return (
        <Routes>
            {/* PUBLIC */}
            <Route
                path={"products/*"}
                element={<PublicRoute element={ProductsPage} />}
            />
            <Route
                path={"auth/*"}
                element={<PublicRoute element={AuthPage} />}
            />
            <Route
                path={"orders/*"}
                element={<PublicRoute element={OrdersPage} />}
            />


            {/* PRIVATE */}
            <Route
                path={"cart/*"}
                element={<PrivateRoute element={CartPage} />}
            />
             <Route path={"/users/profile/*"} element={<PrivateRoute element={UserPage} />} />

            {/* DEFAULT */}
            <Route path="*" element={<Navigate to="/products" />} />
        </Routes>
    );
};

export default AppRoutes;
