import { useState } from "react";

// =========================== MUI ===========================
import { Button, Box, Menu, TextField } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartButton = ({
    size,
    handleAddToCartLocal,
}: //isInCart
{
    size: "medium" | "small" | "large";
    handleAddToCartLocal: (n: number) => void;
    //isInCart: boolean;
}) => {
    const [quantity, setQuantity] = useState<number>(1);
    const [anchorElCart, setAnchorElCart] = useState<null | HTMLElement>(null);

    const handleOpenCartMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElCart(event.currentTarget);
    };

    const handleCloseCartMenu = () => {
        setAnchorElCart(null);
    };

    return (
        <>
            <Button
                variant="outlined"
                color="success"
                onClick={handleOpenCartMenu}
            >
                <ShoppingCartIcon fontSize={size} color="success" />
            </Button>

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
                            setQuantity((quantity) =>
                                quantity === 1 ? 1 : quantity - 1
                            )
                        }
                    />
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
                        onChange={(e) => setQuantity(+e.target.value)}
                    />
                    <AddIcon
                        sx={{
                            cursor: "pointer",
                            ml: 1,
                        }}
                        onClick={() => setQuantity((quantity) => quantity + 1)}
                    />
                </Box>

                <Button
                    size={size}
                    // variant={isInCart ? "contained" : "outlined"}
                    variant="outlined"
                    color="success"
                    onClick={() => {
                        handleAddToCartLocal(quantity);
                    }}
                >
                    <ShoppingCartIcon fontSize={size} color="inherit" />
                </Button>
            </Menu>
        </>
    );
};

export default CartButton;
