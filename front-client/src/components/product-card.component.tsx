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
}: {
    product: ProductDto;
    handleClickCard: (id: string) => void;
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
                    gutterBottom
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
                <Box>
                    <Button size="small">
                        <ShoppingCartIcon
                            color="success"
                            //! addClick as add to cart
                            // onClick={() => handleClickCard(product.id)}
                        />
                    </Button>
                    <Button size="small">
                        <LaunchIcon
                            color="primary"
                            onClick={() => handleClickCard(product.id)}
                        />
                    </Button>
                </Box>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
