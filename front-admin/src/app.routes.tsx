import React, { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

// ========================== mui ==========================
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// ======= private route ======= //
const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
    return true ? (
        <Suspense
            fallback={
                <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                </Box>
            }
        >
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

// ======= pages ======= //
const LoginPage = React.lazy(() => import("./app/login"));
const ProductsPage = React.lazy(() => import("./app/products"));

const AppRoutes = () => {
    return (
        <Routes>
            {/* PUBLIC */}
            <Route path={"/"} element={<PublicRoute element={LoginPage} />} />
            <Route
                path={"/products/*"}
                element={<PublicRoute element={ProductsPage} />}
            />

            {/* DEFAULT */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;
