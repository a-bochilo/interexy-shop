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

// ======= pages ======= //
const RolesPage = React.lazy(
  () => import(/* webpackChunkName: "RolesPage" */ "../roles/roles.page")
);

const RolesRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Suspended element={RolesPage} />} />

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RolesRoutes;
