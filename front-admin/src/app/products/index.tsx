// =========================== React ===========================
import { FC } from "react";

// =========================== MUI ===========================
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

// =========================== Components ===========================
import PageAsideComp from "../../components/aside.comp";
import PageFooterComp from "../../components/page-footer.comp";
import PageNavBarComp from "../../components/navbar.comp";

// =========================== Routes ===========================
import ProductsRoutes from "./products.routes";

const MainGrid = styled(Grid)`
    flex: 1 1 0;
    padding-top: 64px;
`;

const ContentGrid = styled(Grid)`
    display: flex;
    align-items: top;
    min-width: 100%;
`;

const ProductsPage: FC = () => {
    return (
        <MainGrid>
            <PageNavBarComp />
            <ContentGrid
                sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}
            >
                <ProductsRoutes />
                <PageAsideComp />
            </ContentGrid>
            <PageFooterComp />
        </MainGrid>
    );
};

export default ProductsPage;
