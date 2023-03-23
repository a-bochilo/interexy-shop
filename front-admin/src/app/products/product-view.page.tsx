import { FC, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// =========================== MUI ===========================
import styled from "@emotion/styled";
import { CircularProgress, Grid } from "@mui/material";

// =========================== Store ===========================
import { useAppDispatch, useAppSelector } from "../../store";
import {
    deleteProduct,
    fetchProductDetials,
    updateProduct,
} from "./store/products.actions";
import {
    productDetailsSelector,
    productsPendingSelector,
    productsSelector,
} from "./store/products.selectors";

// =========================== Components ===========================
import ProductEditForm from "../../components/product-edit-form.component";

// =========================== DTO's ===========================
import { ProductWithDetailsDto } from "./types/product-with-details.dto";

const MainGrid = styled(Grid)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    justify-content: center;
    width: 100%;
    min-height: 100%;
`;

const ProductViewPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [isEditable, setIsEditable] = useState<boolean>(false);
    const isInitialLoading = useRef(true);
    const { productId } = useParams();

    const products = useAppSelector(productsSelector);
    const productDetails = useAppSelector(productDetailsSelector);
    const pending = useAppSelector(productsPendingSelector);

    useEffect(() => {
        if (!productId) return;
        if (!isInitialLoading.current) return;

        dispatch(fetchProductDetials(productId));
        isInitialLoading.current = false;
    }, [dispatch, productId]);

    let productWithDetails: ProductWithDetailsDto | undefined = undefined;
    const product = products.find((product) => product.id === productId);

    if (productDetails && product) {
        const { id, ...productDetailsWithoutId } = productDetails;
        productWithDetails = { ...product, ...productDetailsWithoutId };
    }

    const handleDelete = (id: string) => {
        dispatch(deleteProduct(id));
        navigate("/products");
    };
    const handleSave = (product: Partial<ProductWithDetailsDto>) => {
        dispatch(updateProduct(product));
    };

    return (
        <MainGrid>
            {(pending.products || pending.productDetails) && (
                <CircularProgress sx={{ alignSelf: "center" }} />
            )}
            {!!productWithDetails && (
                <ProductEditForm
                    product={productWithDetails}
                    pending={pending}
                    isEditable={isEditable}
                    setIsEditable={setIsEditable}
                    handleDelete={handleDelete}
                    handleSave={handleSave}
                />
            )}
        </MainGrid>
    );
};

export default ProductViewPage;
