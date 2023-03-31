// ========================== react ==========================
import React, { FC, PropsWithChildren, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

// ========================== components ==========================
import FallbackComponent from "../../components/fallback.component";

const Suspended: FC<PropsWithChildren & { element: any }> = ({
  element: Element,
}) => {
  return (
    <Suspense fallback={<FallbackComponent />}>
      <Element />
    </Suspense>
  );
};

// ======= pages ======= //
const ProductListPage = React.lazy(
  () => import(/* webpackChunkName: "ProductListPage" */ "./product-list.page")
);
const ProductViewPage = React.lazy(
  () => import(/* webpackChunkName: "ProductViewPage" */ "./product-view.page")
);
const ProductAddPage = React.lazy(
  () => import(/* webpackChunkName: "ProductAddPage" */ "./product-add.page")
);

const ProductsRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Suspended element={ProductListPage} />} />
      <Route
        path={"/:productId"}
        element={<Suspended element={ProductViewPage} />}
      />
      <Route path={"/add"} element={<Suspended element={ProductAddPage} />} />

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/products" />} />
    </Routes>
  );
};

export default ProductsRoutes;
