import { FC } from "react";
import { useNavigate } from "react-router-dom";

// =========================== mui ===========================
import styled from "@emotion/styled";
import { CircularProgress, Grid } from "@mui/material";

// =========================== store ===========================
import {
  productsSelector,
  productsPendingSelector,
} from "./store/products.selectors";
import { useAppSelector } from "../../store";

// =========================== components ===========================
import ProductsTable from "../../components/products-table.component";

// =========================== styled ===========================
const MainGrid = styled(Grid)`
  display: flex;
  align-items: top;
  justify-content: space-around;
  width: 100%;
  min-height: 100vh;
`;

const ProductListPage: FC = () => {
  // ===== hooks =====
  const navigate = useNavigate();

  // ===== selectors =====
  const products = useAppSelector(productsSelector);
  const pending = useAppSelector(productsPendingSelector);

  const handleClickRow = (productId: string) => {
    navigate(`${productId}`);
  };

  return (
    <MainGrid>
      {pending.products && (
        <CircularProgress
          sx={{ alignSelf: "center" }}
          data-testid="pending-stub"
        />
      )}
      {!!products.length && !pending.products && (
        <ProductsTable products={products} handleClickRow={handleClickRow} />
      )}
    </MainGrid>
  );
};

export default ProductListPage;
