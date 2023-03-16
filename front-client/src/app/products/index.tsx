// ======== react ============
import React, { FC } from "react";

// ========================== mui ==========================
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

// ======== components ============
import PageHeaderComp from "../../components/page-header.comp";
import PageAsideComp from "../../components/aside.comp";
import PageFooterComp from "../../components/page-footer.comp";
import PageNavBarComp from "../../components/navbar.comp";

// ======== routes ============
import ProductsRoutes from "./products.routes";

const MainGrid = styled(Grid)`
  flex: 1 1 0;
`;

const ContentGrid = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductsPage: FC = () => {
  return (
    <MainGrid>
      
      <Grid>
        <PageHeaderComp />
        <ContentGrid>
          <ProductsRoutes />
          <PageAsideComp />
        </ContentGrid>
        <PageFooterComp />
      </Grid>
    </MainGrid>
  );
};

export default ProductsPage;
