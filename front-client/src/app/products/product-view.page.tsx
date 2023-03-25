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
    Tooltip,
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

// =========================== Components ===========================
import CartButton from "../../components/cart-button.compoent";

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

    // const isInCart = !cart.find(item => item.id === product?.id);

    const handleAddToCart = (quantity: number) => {
        if (!productWithDetails?.id) return;
        //!add to cart logic
        console.log("productId", productWithDetails.id);
        console.log("quantity", quantity);
    };

    const handleBack = () => {
        dispatch(clearErrors());
        navigate("/products");
    };

    const renderField = (
        obj: ProductWithDetailsDto,
        key: keyof ProductWithDetailsDto
    ) => {
        const value = obj[key];

        return (
            <Grid container>
                <Typography
                    variant="body2"
                    align="right"
                    pr={2}
                    sx={{
                        minWidth: 90,
                        fontWeight: "bold",
                    }}
                >
                    {key.toLowerCase()}
                </Typography>
                <Typography>
                    {typeof value === "string" ? value.toUpperCase() : value}
                </Typography>
            </Grid>
        );
    };

    return (
        <Grid container spacing={10} justifyContent="center" p={5}>
            {(pending.products || pending.productDetails) && (
                <CircularProgress sx={{ alignSelf: "center" }} />
            )}
            {productWithDetails && (
                <>
                    <Grid item xs={6}>
                        <CardMedia
                            component="img"
                            alt={productWithDetails.name}
                            image={productWithDetails.image}
                            sx={{
                                maxWidth: 650,
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={5}
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={2}
                    >
                        <Grid item>
                            <Typography variant="h5" component="h2" pb={3}>
                                {productWithDetails.name.toUpperCase()}
                            </Typography>
                        </Grid>

                        <Grid item>
                            {renderField(productWithDetails, "category")}
                        </Grid>

                        <Grid item>
                            {renderField(productWithDetails, "brand")}
                        </Grid>

                        <Grid item>
                            {renderField(productWithDetails, "color")}
                        </Grid>

                        <Grid item>
                            {renderField(productWithDetails, "material")}
                        </Grid>

                        <Grid item>
                            {renderField(productWithDetails, "size")}
                        </Grid>

                        <Grid item>
                            {renderField(productWithDetails, "description")}
                        </Grid>

                        <Grid
                            item
                            container
                            alignItems={"center"}
                            gap={2}
                            mt={3}
                        >
                            <Typography
                                variant="h4"
                                color="text.secondary"
                                display={"inline-block"}
                            >
                                ${productWithDetails.price}
                            </Typography>

                            <CartButton
                                size="large"
                                handleAddToCartLocal={handleAddToCart}
                                //isInCart={isInCart}
                            />
                            <Tooltip title="Back to all">
                                <Button
                                    variant="outlined"
                                    color="primary" //! change quantity arg
                                    onClick={() => handleBack()}
                                >
                                    <UndoIcon
                                        color="primary"
                                        fontSize="large"
                                    />
                                </Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default ProductViewPage;
