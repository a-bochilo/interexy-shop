import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { debounce } from "lodash";

// =========================== mui ===========================
import styled from "@emotion/styled";
import { CircularProgress, Grid } from "@mui/material";

// =========================== store ===========================
import {
  productsPendingSelector,
  filtredProductsSelector,
} from "./store/products.selectors";
import { useAppDispatch, useAppSelector } from "../../store";
import { cartErrorsSelector, cartSelector } from "../cart/store/cart.selectors";
import {
  addCartItem,
  fetchCart,
  updateCartItem,
} from "../cart/store/cart.actions";

// =========================== components ===========================
import ProductCard from "../../components/product-card.component";

// =========================== styled ===========================
const MainGrid = styled(Grid)`
  display: flex;
  gap: 15px;
  flex-flow: row wrap;
  justify-content: space-around;
  width: 100%;
  min-height: 100%;
  padding: 20px;
`;

const ProductListPage: FC = () => {
  // ===== hooks =====
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // ===== selectors =====
  const filtredProducts = useAppSelector(filtredProductsSelector);
  const pending = useAppSelector(productsPendingSelector);
  const cart = useAppSelector(cartSelector);
  const cartErrors = useAppSelector(cartErrorsSelector);

  // ===== handlers =====
  const handleClickCard = (productId: string) => {
    navigate(`${productId}`);
  };

  const handleAddToCart = debounce(
    async (productId: string, quantity: number, isInCart: boolean) => {
      if (!cart) {
        dispatch(fetchCart());
        return;
      }
      if (!isInCart) {
        dispatch(addCartItem({ productId, quantity }));
        return;
      }
      const item = cart.items.find((item) => item.productId === productId);
      dispatch(updateCartItem({ id: item?.id, productId, quantity }));
    },
    300
  );

  return (
    <MainGrid container spacing={8} data-testid="maingrid-test">
      {pending.products && (
        <CircularProgress
          sx={{ alignSelf: "center" }}
          data-testid="pending-stub"
        />
      )}

      {!!filtredProducts.length &&
        !pending.products &&
        filtredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            handleClickCard={handleClickCard}
            handleAddToCart={handleAddToCart}
            cart={cart}
            error={cartErrors.cart}
          />
        ))}
    </MainGrid>
  );
};

export default ProductListPage;
