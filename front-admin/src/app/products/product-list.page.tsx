import { FC, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// =========================== MUI ===========================
import styled from "@emotion/styled";
import { CircularProgress, Grid } from "@mui/material";

// =========================== Store ===========================
import { fetchProducts } from "./store/products.actions";
import {
    productsSelector,
    productsPendingSelector,
} from "./store/products.selectors";
import { useAppDispatch, useAppSelector } from "../../store";

// =========================== Components ===========================
import ProductsTable from "../../components/products-table.component";

const MainGrid = styled(Grid)`
    display: flex;
    align-items: top;
    justify-content: space-around;
    width: 100%;
    min-height: 100%;
`;

const ProductListPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isInitialLoading = useRef(true);

    const products = useAppSelector(productsSelector);
    const pending = useAppSelector(productsPendingSelector);

    useEffect(() => {
        if (!isInitialLoading.current) return;
        dispatch(fetchProducts());
        isInitialLoading.current = false;
    }, [dispatch]);

    const handleClickRow = (productId: string) => {
        navigate(`${productId}`);
    };

    return (
        <MainGrid>
            {pending.products && (
                <CircularProgress sx={{ alignSelf: "center" }} />
            )}
            {!!products.length && (
                <ProductsTable
                    products={products}
                    handleClickRow={handleClickRow}
                />
            )}
        </MainGrid>
    );
};

export default ProductListPage;
