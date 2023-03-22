import React, { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

// ========================== mui ==========================
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// ======= private route ======= //
const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
  return true ? (
    <Suspense
      fallback={
        <Box sx={{ display: "flex" }}>
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
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    }
  >
    <Element />
  </Suspense>
);

// ======= pages ======= //
const LoginPage = React.lazy(() => import("./app/login"));
const RolesPage = React.lazy(() => import("./app/roles"));

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path={"/"} element={<PublicRoute element={LoginPage} />} />
      <Route path={"roles/*"} element={<PublicRoute element={RolesPage} />} />

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
