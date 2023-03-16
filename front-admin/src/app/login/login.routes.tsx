// ========================== react ==========================
import React, { FC, PropsWithChildren, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

const Suspended: FC<PropsWithChildren & { element: any }> = ({
  element: Element,
}) => {
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Element />
    </Suspense>
  );
};

// ======= pages ======= //
const LoginPage = React.lazy(
  () =>
    import(
      /* webpackChunkName: "LoginPage" */ "../login/login.page"
    )
);

const LoginRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Suspended element={LoginPage} />} />

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default LoginRoutes;
