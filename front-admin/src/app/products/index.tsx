// =========================== react ===========================
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// =========================== mui ===========================
import styled from "@emotion/styled";
import { Button, Grid } from "@mui/material";

// =========================== components ===========================
import PageAsideComp from "../../components/aside.comp";
import PageFooterComp from "../../components/page-footer.comp";
import PageNavBarComp from "../../components/navbar.comp";
import ProductFilterForm from "../../components/product-filter-form.component";

// =========================== store ===========================
import { useAppDispatch } from "../../store";
import { fetchProducts } from "./store/products.actions";

// =========================== routes ===========================
import ProductsRoutes from "./products.routes";

// =========================== styled ===========================
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
  justify-content: flex-end;
`;

const ProductsPage: FC = () => {
  // ===== hooks =====
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <MainGrid>
      <PageNavBarComp />
      <ContentGrid sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}>
        <ProductsRoutes />
        <PageAsideComp>
          <Button
            sx={{
              width: "100%",
            }}
            size="small"
            variant="contained"
            color="success"
            onClick={() => {
              navigate("add");
            }}
          >
            Create new
          </Button>
          <ProductFilterForm />
        </PageAsideComp>
      </ContentGrid>
      <PageFooterComp />
    </MainGrid>
  );
};

export default ProductsPage;
