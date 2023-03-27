// =========================== React ===========================
import { FC, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { debounce } from "lodash";

// =========================== MUI ===========================
import styled from "@emotion/styled";
import { CircularProgress, Grid, Typography } from "@mui/material";

// =========================== Components ===========================
import PageFooterComp from "../../components/page-footer.comp";
import PageNavBarComp from "../../components/navbar.comp";
import PageAsideComp from "../../components/aside.comp";
import CartItem from "../../components/cart-item.component";

// =========================== Store ===========================
import { useAppDispatch, useAppSelector } from "../../store";
import { clearCart, fetchCart, updateCartItem } from "./store/cart.actions";
import { cartPendingSelector, cartSelector } from "./store/cart.selectors";
import { fetchProducts } from "../products/store/products.actions";
import { productsSelector } from "../products/store/products.selectors";

// =========================== DTO's ===========================
import { CartItemDto } from "./types/cart.dto";

const MainGrid = styled(Grid)`
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    padding-top: 64px;
    min-height: 100vh;
    justify-content: space-between;
`;

const InsideGrid = styled(Grid)`
    flex-flow: column;
    justify-content: space-around;
    min-height: 100%;
`;

const ContentGrid = styled(Grid)`
    display: flex;
    flex-grow: 1;
    min-height: 100%;
`;

const CartPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const cart = useAppSelector(cartSelector);
    const products = useAppSelector(productsSelector);
    const pending = useAppSelector(cartPendingSelector);

    useEffect(() => {
        dispatch(fetchCart());
        dispatch(fetchProducts());
    }, [dispatch]);

    const productsInCart = useMemo(
        () =>
            products.filter((product) =>
                cart?.items.find((item) => item.productId === product.id)
            ),
        [products, cart?.items]
    );

    const sortedItems = useMemo(() => {
        if (cart?.items)
            return [...cart?.items].sort((a, b) =>
                a.productId > b.productId
                    ? 1
                    : a.productId < b.productId
                    ? -1
                    : 0
            );
    }, [cart?.items]);

    const handleUpdateCartItem = debounce((item: CartItemDto) => {
        dispatch(updateCartItem(item));
    }, 300);

    const handleDeleteCartItem = debounce((item: CartItemDto) => {
        dispatch(clearCart());
    }, 300);

    return (
        <MainGrid>
            <PageNavBarComp />
            <ContentGrid
                sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}
            >
                <InsideGrid
                    item
                    container
                    spacing={1}
                    alignContent="center"
                    alignItems="center"
                    pt={2}
                >
                    {!cart && pending.cart && (
                        <CircularProgress sx={{ alignSelf: "center" }} />
                    )}
                    {cart &&
                        sortedItems &&
                        sortedItems.map((item) => {
                            const productProp = productsInCart.find(
                                (product) => product.id === item.productId
                            );
                            if (!productProp)
                                return (
                                    <CircularProgress
                                        key={item.productId}
                                        sx={{ alignSelf: "center" }}
                                    />
                                );
                            return (
                                <CartItem
                                    key={item.productId}
                                    item={item}
                                    product={productProp}
                                    handleUpdateCartItem={handleUpdateCartItem}
                                    handleDeleteCartItem={handleDeleteCartItem}
                                />
                            );
                        })}
                </InsideGrid>
                <PageAsideComp>
                    {pending.cart ? (
                        <CircularProgress sx={{ alignSelf: "center" }} />
                    ) : null}
                    <Typography>TEXT</Typography>
                </PageAsideComp>
            </ContentGrid>
            <PageFooterComp />
        </MainGrid>
    );
};

export default CartPage;
