// ========================== react ==========================
import { FC } from "react";

// ========================== components ==========================
import PageHeaderComp from "../../components/page-header.comp";
import PageFooterComp from "../../components/page-footer.comp";
import PageNavBarComp from "../../components/navbar.comp";
import PageAsideComp from "../../components/aside.comp";

// ========================== mui ==========================
import Container from "@mui/material/Container";

const ProductsPage: FC = () => {
  return (
    <>
      <Container>
        <PageNavBarComp />
        <PageHeaderComp />
      </Container>
      <Container sx={{ display: "flex" }}>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "lightcoral",
          }}
        >
          Container for Products
        </Container>
        <PageAsideComp />
      </Container>

      <PageFooterComp />
    </>
  );
};

export default ProductsPage;
