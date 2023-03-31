import { useEffect, useState } from "react";

// =========================== mui ===========================
import { Button, Box, Menu, TextField } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// =========================== components ===========================
import TemporaryTypography from "./temporary-typography.component";

const CartButton = ({
  size,
  handleAddToCartLocal,
  isInCart,
  cartItemQuantity,
  error,
}: {
  size: "medium" | "small" | "large";
  handleAddToCartLocal: (n: number) => void;
  isInCart: boolean;
  cartItemQuantity: number;
  error?: string | null;
}) => {
  // ===== local states =====
  const [quantity, setQuantity] = useState<number>(1);
  const [anchorElCart, setAnchorElCart] = useState<null | HTMLElement>(null);

  // ===== effect =====
  useEffect(() => {
    setQuantity(cartItemQuantity);
  }, [cartItemQuantity]);

  // ===== handlers =====
  const handleOpenCartMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCart(event.currentTarget);
  };

  const handleCloseCartMenu = () => {
    setAnchorElCart(null);
  };

  return (
    <>
      <Button
        variant={isInCart ? "contained" : "outlined"}
        color="success"
        onClick={handleOpenCartMenu}
        data-testid="handleAddToCart-open-test"
      >
        <ShoppingCartIcon fontSize={size} color="inherit" />
      </Button>

      {/* hidden menu */}
      <Menu
        id="cart-menu"
        sx={{
          alignItems: "center",
          textAlign: "center",
        }}
        anchorEl={anchorElCart}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={Boolean(anchorElCart)}
        onClose={handleCloseCartMenu}
        data-testid="hidden-menu-test"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            pb: 1,
            p: 2,
          }}
        >
          <RemoveIcon
            sx={{
              cursor: "pointer",
              mr: 1,
            }}
            onClick={() =>
              setQuantity((quantity) => (quantity === 1 ? 1 : quantity - 1))
            }
            data-testid="decrease-icon-test"
          />
          {/* quantity input */}
          <TextField
            inputProps={{
              style: {
                padding: 1,
                textAlign: "center",
                fontSize: size,
                width: size === "small" ? 30 : 60,
              },
              inputprops: {
                min: 1,
              },
            }}
            value={quantity}
            type="number"
            data-testid="quantity-input-test"
            onChange={(e) => setQuantity(+e.target.value)}
          />
          <AddIcon
            sx={{
              cursor: "pointer",
              ml: 1,
            }}
            data-testid="increase-icon-test"
            onClick={() => setQuantity((quantity) => quantity + 1)}
          />
        </Box>

        <Box>
          <TemporaryTypography
            variant="overline"
            align="center"
            color="error"
            duration={30}
          >
            {!!error && error}
          </TemporaryTypography>
        </Box>

        <Button
          size={size}
          variant={isInCart ? "contained" : "outlined"}
          color="success"
          onClick={() => handleAddToCartLocal(quantity)}
          data-testid="add-to-cart-button-test"
        >
          <ShoppingCartIcon fontSize={size} color="inherit" />
        </Button>
      </Menu>
    </>
  );
};

export default CartButton;
