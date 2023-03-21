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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      }
    >
      <Element />
    </Suspense>
  );
};

// ======= pages ======= //
const UserListPage = React.lazy(
  () => import(/* webpackChunkName: "UserListPage" */ "../users/user-list.page")
);
const UserEditPage = React.lazy(
  () => import(/* webpackChunkName: "UserEditPage" */ "../users/user-edit.page")
);

const UsersRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Suspended element={UserListPage} />} />
      <Route path={"/:userId"} element={<Suspended element={UserEditPage} />} />

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default UsersRoutes;
