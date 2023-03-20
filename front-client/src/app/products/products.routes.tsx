// ========================== react ==========================
import React, { FC, PropsWithChildren, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";


const Suspended: FC<PropsWithChildren & { element: any }> = ({
  element: Element,
}) => {
  return (
    <Suspense fallback={<h2>🌀 Loading...</h2>}>

      <Element />
    </Suspense>
  );
};

// ======= pages ======= //
const ProductListPage = React.lazy(
  () =>
    import(
      /* webpackChunkName: "ProductListPage" */ "../products/product-list.page"
    )
);
const ProductViewPage = React.lazy(
  () =>
    import(
      /* webpackChunkName: "ProductViewPage" */ "../products/product-view.page"
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
