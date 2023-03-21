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
const ProductListPage = React.lazy(
  () =>
    import(
      /* webpackChunkName: "ProductListPage" */ "./product-list.page"
    )
);
const ProductViewPage = React.lazy(
  () =>
    import(
      /* webpackChunkName: "ProductViewPage" */ "./product-view.page"
    )
);

const ProductsRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Suspended element={ProductListPage} />} />
      <Route
        path={"/:productId"}
        element={<Suspended element={ProductViewPage} />}
      />

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default ProductsRoutes;
