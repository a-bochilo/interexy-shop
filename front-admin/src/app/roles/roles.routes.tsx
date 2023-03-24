// ========================== react ==========================
import React, { FC, PropsWithChildren, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

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
const RolesListPage = React.lazy(
  () => import(/* webpackChunkName: "RolesPage" */ "../roles/roles-list.page")
);

const RolesViewPage = React.lazy(
  () => import(/* webpackChunkName: "RolesPage" */ "../roles/role-view.page")
);

const RoleCreatePage = React.lazy(
  () => import (/* webpackChunkName: "RolesPage" */ "../roles/role-create.page")
)

const RolesRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/*"} element={<Suspended element={RolesListPage} />} />
      <Route path={"/:id"} element={<Suspended element={RolesViewPage} />}/>
      <Route path={"/create"} element={<Suspended element={RoleCreatePage} />}/>

      {/* DEFAULT */}
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
};

export default RolesRoutes;
