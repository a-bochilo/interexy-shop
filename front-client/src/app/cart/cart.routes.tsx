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
    () => import(/* webpackChunkName: "ProductListPage" */ "./cart-list.page")
);

const ProductsRoutes: FC = () => {
    return (
        <Routes>
            <Route
                path={"/"}
                element={<Suspended element={ProductListPage} />}
            />

            {/* DEFAULT */}
            <Route path="*" element={<Navigate to="/cart" />} />
        </Routes>
    );
};

export default ProductsRoutes;
