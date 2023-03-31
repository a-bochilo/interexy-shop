/* eslint-disable react-hooks/exhaustive-deps */
// =========================== React ===========================
import { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// =========================== MUI ===========================
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

// =========================== Components ===========================
import PageAsideComp from "../../components/aside.component";
import PageFooterComp from "../../components/page-footer.comp";
import PageNavBarComp from "../../components/navbar.comp";
import ProductFilterForm from "../../components/product-filter-form.component";

// =========================== Store ===========================
import { useAppDispatch } from "../../store";
import { fetchProducts } from "./store/products.actions";
import { fetchProductsInCategory } from "./store/products.actions";

// =========================== Routes ===========================
import ProductsRoutes from "./products.routes";
import { ProductsCategory } from "./types/products-category.enum";
import { fetchCart } from "../cart/store/cart.actions";

const MainGrid = styled(Grid)`
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    padding-top: 64px;
    min-height: 100vh;
    justify-content: space-between;
`;

const ContentGrid = styled(Grid)`
    display: flex;
    flex-grow: 1;
    min-width: 100%;
    min-height: 100%;
`;

const ProductsPage: FC = () => {
    const dispatch = useAppDispatch();
    const [searchParams, _] = useSearchParams();

    const category = searchParams.get("category") as ProductsCategory;

    useEffect(() => {
        if (window.localStorage.getItem("token")) dispatch(fetchCart());
        if (category !== undefined) {
            dispatch(fetchProductsInCategory(category));
            return;
        }
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <MainGrid>
            <PageNavBarComp />
            <ContentGrid
                sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}
            >
                <ProductsRoutes />
                <PageAsideComp>
                    <ProductFilterForm />
                </PageAsideComp>
            </ContentGrid>
            <PageFooterComp />
        </MainGrid>
    );
};

export default ProductsPage;
