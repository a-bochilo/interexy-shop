// ========================== react ==========================
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
                <Box
                    sx={{
                        display: "flex",
                        minHeight: "100vh",
                        minWidth: "100vw",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
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
            <Box
                sx={{
                    display: "flex",
                    minHeight: "100vh",
                    minWidth: "100vw",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CircularProgress />
            </Box>
        }
    >
        <Element />
    </Suspense>
);

// ======= pages ======= //
const ProductsPage = React.lazy(() => import("./app/products"));

const AppRoutes = () => {
    return (
        <Routes>
            {/* PUBLIC */}
            <Route
                path={"products/*"}
                element={<PublicRoute element={ProductsPage} />}
            />

            {/* DEFAULT */}
            <Route path="*" element={<Navigate to="/products" />} />
        </Routes>
    );
};

export default AppRoutes;
