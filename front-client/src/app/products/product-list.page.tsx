import { FC } from "react";
import { useNavigate } from "react-router-dom";

// =========================== MUI ===========================
import styled from "@emotion/styled";
import { CircularProgress, Grid } from "@mui/material";

// =========================== Store ===========================
import { productsSelector, productsPendingSelector } from "./store/products.selectors";
import { useAppSelector } from "../../store";

// =========================== Components ===========================
import ProductCard from "../../components/product-card.component";

const MainGrid = styled(Grid)`
  display: flex;
  // align-items: top;
  gap: 15px;
  flex-flow: row wrap;
  justify-content: space-around;
  width: 100%;
  min-height: 100%;
  padding: 20px;
`;

const ProductListPage: FC = () => {
  const navigate = useNavigate();

  const products = useAppSelector(productsSelector);
  const pending = useAppSelector(productsPendingSelector);

  const handleClickCard = (productId: string) => {
    navigate(`${productId}`);
  };

  const handleAddToCart = (productId: string, quantity: number) => {
    //! add to cart logic
    console.log("productId", productId);
    console.log("quantity", quantity);
  };

  return (
    <MainGrid>
      {pending.products && <CircularProgress sx={{ alignSelf: "center" }} />}
      {!!products.length &&
        !pending.products &&
        products.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            handleClickCard={handleClickCard}
            handleAddToCart={handleAddToCart}
          />
        ))}
    </MainGrid>
  );
};

export default ProductListPage;
