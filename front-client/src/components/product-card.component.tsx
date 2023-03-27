// =========================== MUI ===========================
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LaunchIcon from "@mui/icons-material/Launch";

// =========================== Interfaces & DTO's ===========================
import { ProductDto } from "../app/products/types/product.dto";

const ProductCard = ({
    product,
    handleClickCard,
    handleAddToCart,
}: {
    product: ProductDto;
    handleClickCard: (id: string) => void;
    handleAddToCart: (id: string, quantity: number) => void;
}) => {
    return (
        <Card key={product.id} sx={{ width: 250 }}>
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
            </CardContent>
            <CardActions
                sx={{
                    justifyContent: "space-between",
                }}
            >
                <Typography variant="h5" color="text.secondary" pl={2}>
                    ${product.price}
                </Typography>
                <Box gap={2}>
                    <Button
                        size="small"
                        //! change quantity arg
                        onClick={() => handleAddToCart(product.id, 1)}
                    >
                        <ShoppingCartIcon color="success" />
                    </Button>
                    <Button
                        size="small"
                        onClick={() => handleClickCard(product.id)}
                    >
                        <LaunchIcon color="primary" />
                    </Button>
                </Box>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
