import { FC, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
// import { useNavigate } from "react-router-dom";

// =========================== MUI ===========================
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

// =========================== Store ===========================
import { fetchProducts } from "./store/products.actions";
import { productsSelector } from "./store/products.selectors";

const MainGrid = styled(Grid)`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const ProductListPage: FC = () => {
    const isInitialLoading = useRef(true);
    const dispatch = useAppDispatch();
    const products = useAppSelector(productsSelector);

    // const navigate = useNavigate();

    useEffect(() => {
        if (!isInitialLoading.current) return;
        dispatch(fetchProducts());
        isInitialLoading.current = false;
    }, [dispatch, products.length]);
    return (
        <MainGrid>
            {products.map((product) => (
                <div key={product.id}>{product.name}</div>
            ))}
        </MainGrid>
    );
};

export default ProductListPage;
