// ========================== react ==========================
import React, { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

// ========================== components ==========================
import FallbackComponent from "./components/fallback.component";

// ======= private route ======= //
const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
    return true ? (
        <Suspense fallback={<FallbackComponent />}>
            <div>
                <Element />
            </div>
        </Suspense>
    ) : (
        <Navigate to={"/"} />
    );
};

// ======= public route ======= //
const PublicRoute: FC<{ element: any }> = ({ element: Element }) => (
    <Suspense fallback={<FallbackComponent />}>
        <Element />
    </Suspense>
);

// ======= pages ======= //
const ProductsPage = React.lazy(() => import("./app/products"));
const CartPage = React.lazy(() => import("./app/cart"));

const AppRoutes = () => {
    return (
        <Routes>
            {/* PUBLIC */}
            <Route
                path={"products/*"}
                element={<PublicRoute element={ProductsPage} />}
            />

            {/* PRIVATE */}
            <Route
                path={"cart/*"}
                element={<PrivateRoute element={CartPage} />}
            />

            {/* DEFAULT */}
            <Route path="*" element={<Navigate to="/products" />} />
        </Routes>
    );
};

export default AppRoutes;
