import { FC } from "react";
import { useNavigate } from "react-router-dom";

// =========================== MUI ===========================
import styled from "@emotion/styled";
import { CircularProgress, Grid } from "@mui/material";

// =========================== Store ===========================
import {
    productsSelector,
    productsPendingSelector,
} from "./store/products.selectors";
import { useAppSelector } from "../../store";

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
    const navigate = useNavigate();

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
                <ProductsTable
                    products={products}
                    handleClickRow={handleClickRow}
                />
            )}
        </MainGrid>
    );
};

export default ProductListPage;
