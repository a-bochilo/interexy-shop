// =========================== MUI ===========================
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Box,
    Grid,
    Tooltip,
} from "@mui/material";

import LaunchIcon from "@mui/icons-material/Launch";

// =========================== Interfaces & DTO's ===========================
import { ProductDto } from "../app/products/types/product.dto";

// =========================== Components ===========================
import CartButton from "./cart-button.compoent";

const ProductCard = ({
    product,
    handleClickCard,
    handleAddToCart,
}: {
    product: ProductDto;
    handleClickCard: (id: string) => void;
    handleAddToCart: (id: string, quantity: number) => void;
}) => {

    const handleAddToCartLocal = (quantity: number) => {
        handleAddToCart(product.id, quantity);
    };

    // const isInCart = !cart.find(item => item.id === product.id);

    return (
        <Grid item xs={11} sm={6} md={4} xl={3}>
            <Card key={product.id} sx={{ minWidth: 250 }}>
                <CardMedia
                    component="img"
                    alt={product.name}
                    image={product.image}
                />
                <CardContent>
                    <Typography
                        variant="h5"
                        onClick={() => handleClickCard(product.id)}
                        sx={{
                            cursor: "pointer",
                            "&:hover": {
                                color: "error.main",
                            },
                        }}
                    >
                        {product.name}
                    </Typography>
                    <Typography variant="body2">
                        {product.brand.toUpperCase()}
                    </Typography>
                </CardContent>

                <CardActions
                    sx={{
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="h5" color="text.secondary" pl={2}>
                        ${product.price}
                    </Typography>
                    <Box
                        sx={{
                            width: "60%",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <CartButton
                            size="small"
                            handleAddToCartLocal={handleAddToCartLocal}
                            //isInCart={isInCart}
                        />
                        <Tooltip title="Learn details">
                            <Button
                                size="small"
                                variant="outlined"
                                color="primary"
                                onClick={() => handleClickCard(product.id)}
                            >
                                <LaunchIcon color="primary" />
                            </Button>
                        </Tooltip>
                    </Box>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ProductCard;
