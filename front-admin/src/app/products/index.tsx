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
