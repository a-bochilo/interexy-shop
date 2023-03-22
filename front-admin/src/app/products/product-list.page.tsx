import { FC, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// =========================== MUI ===========================
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

// =========================== Store ===========================
import { fetchProducts } from "./store/products.actions";
import {
    productsSelector,
    productsPendingSelector,
} from "./store/products.selectors";
import { useAppDispatch, useAppSelector } from "../../store";
import { setProductById } from "./store/products.slice";

// =========================== Components ===========================
import ProductsTable from "../../components/products-table.component";

const MainGrid = styled(Grid)`
    display: flex;
    align-items: top;
    justify-content: space-around;
    width: 100%;
`;

const ProductListPage: FC = () => {
    const isInitialLoading = useRef(true);
    const dispatch = useAppDispatch();
    const products = useAppSelector(productsSelector);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isInitialLoading.current) return;
        dispatch(fetchProducts());
        isInitialLoading.current = false;
    }, [dispatch, products.length]);

    const handleClickRow = (productId: string) => {
        dispatch(setProductById(productId));
        navigate(`${productId}`);
    };

    return (
        <MainGrid>
            {products.length && (
                <ProductsTable
                    products={products}
                    handleClickRow={handleClickRow}
                />
            )}
        </MainGrid>
    );
};

export default ProductListPage;
