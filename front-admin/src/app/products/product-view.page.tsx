import { FC, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

// =========================== MUI ===========================
import styled from "@emotion/styled";
import { CircularProgress, Grid } from "@mui/material";

// =========================== Store ===========================
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchProductDetials, fetchProducts } from "./store/products.actions";
import {
    productSelector,
    productsPendingSelector,
    productsSelector,
} from "./store/products.selectors";

const MainGrid = styled(Grid)`
    display: flex;
    align-items: top;
    justify-content: space-around;
    width: 100%;
    min-height: 100%;
`;

const ProductViewPage: FC = () => {
    const dispatch = useAppDispatch();

    const isInitialLoading = useRef(true);
    const { productId } = useParams();

    const products = useAppSelector(productsSelector);
    const product = useAppSelector(productSelector);
    const pending = useAppSelector(productsPendingSelector);

    useEffect(() => {
        if (!productId) return;
        if (!isInitialLoading.current) return;

        dispatch(fetchProductDetials(productId));
        isInitialLoading.current = false;
    }, [dispatch, productId]);

    const productMainInfo = products.find(
        (product) => product.id === productId
    );

    return (
        <MainGrid>
            {(pending.products || pending.product) && (
                <CircularProgress sx={{ alignSelf: "center" }} />
            )}
            {!!productMainInfo && !!product && (
                <>
                    <div>{productMainInfo.name}</div>
                    <div>{product.color}</div>
                </>
            )}
        </MainGrid>
    );
};

export default ProductViewPage;
