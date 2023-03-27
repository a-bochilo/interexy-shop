import { FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { debounce } from "lodash";

// =========================== MUI ===========================
import styled from "@emotion/styled";
import { CircularProgress, Grid } from "@mui/material";

// =========================== Store ===========================
import {
    productsSelector,
    productsPendingSelector,
} from "./store/products.selectors";
import { useAppDispatch, useAppSelector } from "../../store";
import { cartErrorsSelector, cartSelector } from "../cart/store/cart.selectors";
import {
    addCartItem,
    fetchCart,
    updateCartItem,
} from "../cart/store/cart.actions";

// =========================== Components ===========================
import ProductCard from "../../components/product-card.component";

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
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const products = useAppSelector(productsSelector);
    const pending = useAppSelector(productsPendingSelector);
    const cart = useAppSelector(cartSelector);
    const cartErrors = useAppSelector(cartErrorsSelector);

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
            const item = cart.items.find(
                (item) => item.productId === productId
            );
            dispatch(updateCartItem({ id: item?.id, productId, quantity }));
        },
        300
    );

    return (
        <MainGrid container spacing={8}>
            {pending.products && (
                <CircularProgress sx={{ alignSelf: "center" }} />
            )}
            {!!products.length &&
                !pending.products &&
                products.map((product) => (
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
