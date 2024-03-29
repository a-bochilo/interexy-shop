// =========================== mui ===========================
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

// =========================== interfaces & dto's ===========================
import { ProductDto } from "../app/products/types/product.dto";

// =========================== components ===========================
import CartButton from "./cart-button.compoent";
import { CartDto } from "../app/cart/types/cart.dto";

const ProductCard = ({
  product,
  cart,
  handleClickCard,
  handleAddToCart,
  error,
}: {
  product: ProductDto;
  cart: CartDto | null;
  handleClickCard: (id: string) => void;
  handleAddToCart: (id: string, quantity: number, isInCart: boolean) => void;
  error?: string | null;
}) => {
  // ===== check if item exist and get quantity for nested element =====
  const cartItem = cart?.items.find((item) => item.productId === product.id);
  const cartItemQuantity = !!cartItem ? cartItem.quantity : 1;

  // ===== handlers =====
  const handleAddToCartLocal = (quantity: number) => {
    handleAddToCart(product.id, quantity, !!cartItem);
  };

  return (
    <Grid item xs={11} sm={6} md={4} xl={3}>
      <Card key={product.id} sx={{ minWidth: 250 }}>
        <CardMedia component="img" alt={product.name} image={product.image} />
        <CardContent>
          <Typography
            variant="h5"
            onClick={() => handleClickCard(product.id)}
            data-testid="card-name-typograhy-test"
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "error.main",
              },
            }}
          >
            {product.name}
          </Typography>
          <Typography variant="body2">{product.brand.toUpperCase()}</Typography>
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
              isInCart={!!cartItem}
              cartItemQuantity={cartItemQuantity}
              error={error}
              data-testid="handleAddToCart-test"
            />
            <Tooltip title="Learn details">
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => handleClickCard(product.id)}
                data-testid="handleClickCard-test"
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
