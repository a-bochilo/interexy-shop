// ========================== react ==========================
import { FC } from "react";

// ========================== components ==========================
import PageHeaderComp from "../../components/page-header.comp";
import PageFooterComp from "../../components/page-footer.comp";
import PageNavBarComp from "../../components/navbar.comp";
import PageAsideComp from "../../components/aside.comp";

// ========================== mui ==========================
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

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
      <PageNavBarComp />
      <Grid>
        <PageHeaderComp />
        <ContentGrid>
          <div>Container for Products</div>
          <PageAsideComp />
        </ContentGrid>
        <PageFooterComp />
      </Grid>
    </MainGrid>
  );
};

export default ProductsPage;
