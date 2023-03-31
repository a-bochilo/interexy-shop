// ========================== react ==========================
import React, { FC, PropsWithChildren, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

// ========================== mui ==========================
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Suspended: FC<PropsWithChildren & { element: any }> = ({
  element: Element,
}) => {
  return (
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
};

// ========================== pages ===========================
const SignInPage = React.lazy(
  () => import(/* webpackChunkName: "LoginPage" */ "./signIn.page")
);

const SignUpPage = React.lazy(
  () => import(/* webpackChunkName: "LoginPage" */ "./signUp.page")
);

const LoginRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/signIn"} element={<Suspended element={SignInPage} />} />
      <Route path={"/signUp"} element={<Suspended element={SignUpPage} />} />

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default LoginRoutes;
