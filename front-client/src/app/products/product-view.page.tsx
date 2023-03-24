import { FC, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// =========================== MUI ===========================
import styled from "@emotion/styled";
import {
    Box,
    Button,
    CardMedia,
    CircularProgress,
    Grid,
    Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import UndoIcon from "@mui/icons-material/Undo";

// =========================== Store ===========================
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchProductDetials } from "./store/products.actions";
import {
    productDetailsSelector,
    productsErrorsSelector,
    productsPendingSelector,
    productsSelector,
} from "./store/products.selectors";
import { clearErrors } from "./store/products.slice";

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

    const handleAddToCart = (productId: string, quantity: number) => {
        //!add to cart logic
        console.log("productId", productId);
        console.log("quantity", quantity);
    };

    const handleBack = () => {
        dispatch(clearErrors());
        navigate("/products");
    };

    const renderField = (key: keyof typeof productWithDetails, value: any) => {
        return (
            <Box>
                <Typography variant="h5">{key}</Typography>
                <Typography variant="h5">{value}</Typography>
            </Box>
        );
    };

    return (
        <MainGrid>
            {(pending.products || pending.productDetails) && (
                <CircularProgress sx={{ alignSelf: "center" }} />
            )}
            {productWithDetails && (
                <Box
                    key={productWithDetails.id}
                    sx={{
                        width: 1200,
                        maxWidth: "90%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <CardMedia
                        component="img"
                        alt={productWithDetails.name}
                        image={productWithDetails.image}
                        sx={{
                            width: 650,
                            maxWidth: "65%",
                        }}
                    />
                    <Box
                        sx={{
                            width: 350,
                            minWidth: "30%",
                        }}
                    >
                        <Typography variant="h4">
                            {productWithDetails.name.toUpperCase()}
                        </Typography>

                        <Typography variant="h5" color="text.secondary">
                            ${productWithDetails.price}
                        </Typography>
                        <Box>
                            <ShoppingCartIcon
                                color="success"
                                //! change quantity arg
                                onClick={() => {
                                    handleAddToCart(
                                        productWithDetails?.id as string,
                                        1
                                    );
                                }}
                            />

                            <UndoIcon
                                color="primary"
                                onClick={() => handleBack()}
                            />
                        </Box>
                    </Box>
                </Box>
            )}
        </MainGrid>
    );
};

export default ProductViewPage;
