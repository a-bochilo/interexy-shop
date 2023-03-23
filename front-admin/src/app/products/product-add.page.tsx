import { FC, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// =========================== MUI ===========================
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

// =========================== Store ===========================
import { useAppDispatch, useAppSelector } from "../../store";
import { createProduct, fetchProductDetials } from "./store/products.actions";
import {
    productDetailsSelector,
    productsErrorsSelector,
    productsPendingSelector,
    productsSelector,
} from "./store/products.selectors";
import { clearErrors } from "./store/products.slice";

// =========================== Components ===========================
import ProductAddForm from "../../components/product-add-form.component";

// =========================== DTO's ===========================
import { ProductWithDetailsDto } from "./types/product-with-details.dto";
import { ProductCreateDto } from "./types/product-create.dto";

const MainGrid = styled(Grid)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    justify-content: center;
    width: 100%;
    min-height: 100%;
`;

const ProductAddPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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

    const handleSave = async (product: ProductCreateDto) => {
        dispatch(clearErrors());
        const { type } = await dispatch(createProduct(product));
        setIsClicked(true);
        return !type.endsWith("rejected");
    };
    const handleBack = () => {
        dispatch(clearErrors());
        navigate("/products");
    };

    return (
        <MainGrid>
            {!productWithDetails && (
                <ProductAddForm
                    pending={pending}
                    fetchingErrors={errors}
                    isClicked={isClicked}
                    handleSave={handleSave}
                    handleBack={handleBack}
                />
            )}
        </MainGrid>
    );
};

export default ProductAddPage;
