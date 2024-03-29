// =========================== react ===========================
import { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// =========================== mui ===========================
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

// =========================== components ===========================
import PageAsideComp from "../../components/aside.component";
import PageFooterComp from "../../components/page-footer.comp";
import PageNavBarComp from "../../components/navbar.comp";
import ProductFilterForm from "../../components/product-filter-form.component";

// =========================== store ===========================
import { useAppDispatch } from "../../store";
import { fetchProducts } from "./store/products.actions";
import { fetchProductsInCategory } from "./store/products.actions";

// =========================== routes ===========================
import ProductsRoutes from "./products.routes";
import { ProductsCategory } from "./types/products-category.enum";
import { fetchCart } from "../cart/store/cart.actions";

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

  // ===== params =====
  const [searchParams, _] = useSearchParams();
  const category = searchParams.get("category") as ProductsCategory;

  // ===== effect =====
  useEffect(() => {
    if (window.localStorage.getItem("token")) dispatch(fetchCart());
    if (category !== (undefined || null)) {
      dispatch(fetchProductsInCategory(category));
      return;
    }
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <MainGrid>
      <PageNavBarComp />
      <ContentGrid
        sx={{
          flexDirection: { xs: "column-reverse", md: "row" },
        }}
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
