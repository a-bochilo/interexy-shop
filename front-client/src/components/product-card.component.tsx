import { useState } from "react";

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
    Menu,
    TextField,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LaunchIcon from "@mui/icons-material/Launch";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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
    const [quantity, setQuantity] = useState<number>(1);
    const [anchorElCart, setAnchorElCart] = useState<null | HTMLElement>(null);

    const handleOpenCartMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElCart(event.currentTarget);
    };

    const handleCloseCartMenu = () => {
        setAnchorElCart(null);
    };

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
                        <Button
                            size="small"
                            variant="outlined"
                            color="success"
                            onClick={() =>
                                handleAddToCart(product.id, quantity)
                            }
                            onMouseEnter={handleOpenCartMenu}
                        >
                            <ShoppingCartIcon color="success" />
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
                            // keepMounted
                            autoFocus={false}
                            transformOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                            }}
                            open={Boolean(anchorElCart)}
                            onClose={handleCloseCartMenu}
                            MenuListProps={{
                                onMouseLeave: handleCloseCartMenu,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    width: 100,
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                    pb: 1,
                                }}
                            >
                                <RemoveIcon
                                    sx={{
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setQuantity(quantity - 1)}
                                />
                                <TextField
                                    inputProps={{
                                        style: {
                                            padding: 1,
                                            textAlign: "center",
                                            height: 25,
                                            width: 30,
                                        },
                                    }}
                                    size="small"
                                    margin="none"
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(+e.target.value)
                                    }
                                >
                                    {/* {quantity} */}
                                </TextField>
                                <AddIcon
                                    sx={{
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setQuantity(quantity + 1)}
                                />
                            </Box>
                            <Button
                                size="small"
                                variant="outlined"
                                color="success"
                                onClick={() =>
                                    handleAddToCart(product.id, quantity)
                                }
                            >
                                <ShoppingCartIcon color="success" />
                            </Button>
                        </Menu>
                        <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            onClick={() => handleClickCard(product.id)}
                        >
                            <LaunchIcon color="primary" />
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ProductCard;
