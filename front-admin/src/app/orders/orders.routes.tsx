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
const OrdersListPage = React.lazy(
  () => import(/* webpackChunkName: "RolesPage" */ "../orders/orders-list.page")
);

const OrderItemsPage = React.lazy(
  () => import(/* webpackChunkName: "RolesPage" */ "../orders/orders-view.page")
);

const RolesRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/*"} element={<Suspended element={OrdersListPage} />} />
      <Route
        path={"/:orderId"}
        element={<Suspended element={OrderItemsPage} />}
      />
    </Routes>
  );
};

export default RolesRoutes;
