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
    productsErrorsSelector,
    productsPendingSelector,
    productsSelector,
} from "./store/products.selectors";
import { clearErrors } from "./store/products.slice";

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
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const isInitialLoading = useRef(true);
    const { productId } = useParams();

    const products = useAppSelector(productsSelector);
    const productDetails = useAppSelector(productDetailsSelector);
    const pending = useAppSelector(productsPendingSelector);
    const errors = useAppSelector(productsErrorsSelector);

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

    const handleDelete = async (id: string) => {
        dispatch(clearErrors());
        const result = await dispatch(deleteProduct(id));
        setIsClicked(true);
        if (result.type.endsWith("rejected")) return;
        navigate("/products");
    };
    const handleSave = (product: Partial<ProductWithDetailsDto>) => {
        dispatch(clearErrors());
        dispatch(updateProduct(product));
        setIsClicked(true);
    };
    const handleBack = () => {
        dispatch(clearErrors());
        navigate("/products");
    };

    return (
        <MainGrid>
            {!productWithDetails &&
                (pending.products || pending.productDetails) && (
                    <CircularProgress sx={{ alignSelf: "center" }} />
                )}
            {!!productWithDetails && (
                <ProductEditForm
                    product={productWithDetails}
                    pending={pending}
                    fetchingErrors={errors}
                    isEditable={isEditable}
                    isClicked={isClicked}
                    setIsEditable={setIsEditable}
                    handleDelete={handleDelete}
                    handleSave={handleSave}
                    handleBack={handleBack}
                />
            )}
        </MainGrid>
    );
};

export default ProductViewPage;
