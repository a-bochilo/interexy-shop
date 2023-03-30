// =========================== React ===========================
import { FC, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { debounce } from "lodash";
import { useTranslation } from "react-i18next";

// =========================== MUI ===========================
import styled from "@emotion/styled";
import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

// =========================== Components ===========================
import PageFooterComp from "../../components/page-footer.comp";
import PageNavBarComp from "../../components/navbar.comp";
import PageAsideComp from "../../components/aside.component";
import CartItem from "../../components/cart-item.component";

// =========================== Store ===========================
import { useAppDispatch, useAppSelector } from "../../store";
import {
    clearCart,
    deleteCartItem,
    fetchCart,
    updateCartItem,
} from "./store/cart.actions";
import {
    cartErrorsSelector,
    cartPendingSelector,
    cartSelector,
} from "./store/cart.selectors";
import { fetchProducts } from "../products/store/products.actions";
import { productsSelector } from "../products/store/products.selectors";
import { fetchCreateOrder } from "../orders/store/orders.actions";
import { getErrorSelector } from "../orders/store/orders.selector";

// =========================== DTO's & Types ===========================
import { CartItemDto } from "./types/cart.dto";
import TemporaryTypography from "../../components/temporary-typography.component";
import { ICartTranslations } from "./types/cart-translation.interface";

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
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const { t } = useTranslation();
    const cartInfoTranslation: ICartTranslations = t("cart", {
        returnObjects: true,
    });

    const cart = useAppSelector(cartSelector);
    const products = useAppSelector(productsSelector);
    const pending = useAppSelector(cartPendingSelector);
    const cartErrors = useAppSelector(cartErrorsSelector);
    const orderErrors = useAppSelector(getErrorSelector);

    useEffect(() => {
        dispatch(fetchCart());
        dispatch(fetchProducts());
    }, [dispatch]);

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

    const total = useMemo(() => {
        if (cart?.items)
            return [...cart?.items].reduce((acc, item) => {
                const price = products.find(
                    (product) => product.id === item.productId
                )?.price;

                return (acc += price ? item.quantity * price : 0);
            }, 0);
    }, [cart?.items]);

    const handleUpdateCartItem = debounce((item: CartItemDto) => {
        dispatch(updateCartItem(item));
    }, 300);

    const handleDeleteCartItem = debounce((item: CartItemDto) => {
        dispatch(deleteCartItem(item));
    }, 300);

    const handleNavigate = (productId: string) => {
        navigate(`/products/${productId}`);
    };

    const handleCreateOrder = debounce(async () => {
        if (!cart?.items.length) return;

        const { type } = await dispatch(fetchCreateOrder(cart));
        setIsClicked(true);

        if (!type.endsWith("rejected")) dispatch(clearCart());
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
                    <Typography
                        variant="h4"
                        component="h1"
                        color="text.primary"
                        alignSelf="flex-start"
                        ml={3}
                        mt={2}
                    >
                        {!!cart?.items.length ? (
                            <>{cartInfoTranslation.ordering}</>
                        ) : (
                            <>{cartInfoTranslation.emptyCartStub}</>
                        )}
                    </Typography>
                    {!cart && pending.cart && (
                        <CircularProgress
                            sx={{ alignSelf: "center" }}
                            data-testid="pending-stub"
                        />
                    )}
                    {cart &&
                        sortedItems &&
                        sortedItems.map((item) => {
                            const productProp = products.find(
                                (product) => product.id === item.productId
                            );
                            if (!productProp)
                                return (
                                    <CircularProgress
                                        key={item.productId}
                                        sx={{ alignSelf: "center" }}
                                        data-testid="pending-stub-item"
                                    />
                                );
                            return (
                                <CartItem
                                    key={item.productId}
                                    item={item}
                                    product={productProp}
                                    handleUpdateCartItem={handleUpdateCartItem}
                                    handleDeleteCartItem={handleDeleteCartItem}
                                    handleNavigate={handleNavigate}
                                    translations={cartInfoTranslation}
                                />
                            );
                        })}
                </InsideGrid>
                <PageAsideComp>
                    <Typography variant="h5" color="success.light">
                        {cartInfoTranslation.orderAmount}: ${total}
                    </Typography>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ width: "100%" }}
                        onClick={() => handleCreateOrder()}
                        disabled={!cart?.items.length}
                        data-testid="create-order-btn"
                    >
                        {cartInfoTranslation.confirmOrder}
                    </Button>
                    {pending.cart ? (
                        <CircularProgress sx={{ alignSelf: "center" }} />
                    ) : null}
                    {cartErrors.cart || orderErrors.orders ? (
                        <>
                            <TemporaryTypography
                                variant="overline"
                                align="center"
                                color="error"
                                duration={30}
                            >
                                {cartErrors.cart}
                            </TemporaryTypography>
                            <TemporaryTypography
                                variant="overline"
                                align="center"
                                color="error"
                                duration={30}
                            >
                                {orderErrors.orders}
                            </TemporaryTypography>
                        </>
                    ) : null}
                    {isClicked &&
                    !pending.cart &&
                    !pending.cart &&
                    !cartErrors.cart &&
                    !orderErrors.orders ? (
                        <TemporaryTypography
                            variant="overline"
                            align="center"
                            color="success.main"
                            duration={2}
                            timeoutFunction={setIsClicked}
                        >
                            <DoneIcon data-testid="done-icon-test" />
                        </TemporaryTypography>
                    ) : null}
                </PageAsideComp>
            </ContentGrid>
            <PageFooterComp />
        </MainGrid>
    );
};

export default CartPage;
