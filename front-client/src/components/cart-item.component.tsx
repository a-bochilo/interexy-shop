// =========================== MUI ===========================
import { CardMedia, Grid, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

// =========================== DTO's & Interfaces ===========================
import { ProductDto } from "../app/products/types/product.dto";
import { CartItemDto } from "../app/cart/types/cart.dto";
import { useEffect, useState } from "react";

const CartItem = ({
    item,
    product,
    handleUpdateCartItem,
    handleDeleteCartItem,
    handleNavigate,
}: {
    item: CartItemDto;
    product: ProductDto;
    handleUpdateCartItem: (item: CartItemDto) => void;
    handleDeleteCartItem: (item: CartItemDto) => void;
    handleNavigate: (productId: string) => void;
}) => {
    const [quantity, setQuantity] = useState<number>(item.quantity);

    useEffect(() => {
        if (item.quantity === quantity) return;
        handleUpdateCartItem({ ...item, quantity });
    }, [quantity]);

    const handleIncrease = () => {
        setQuantity((quantity) => quantity + 1);
    };

    const handleDecrease = () => {
        setQuantity((quantity) => (quantity === 1 ? 1 : quantity - 1));
    };

    return (
        <Grid
            item
            xs={12}
            md={12}
            lg={11}
            container
            spacing={2}
            justifyContent="space-between"
            alignItems={"center"}
            p={3}
        >
            {product && (
                <>
                    <Grid item xs={3} md={2}>
                        <CardMedia
                            sx={{ cursor: "pointer" }}
                            component="img"
                            alt={product.name}
                            image={product.image}
                            onClick={() => handleNavigate(product.id)}
                        />
                    </Grid>
                    <Grid item xs={4} container direction="column" spacing={2}>
                        <Grid item>
                            <Typography
                                variant="h5"
                                component="h2"
                                sx={{ cursor: "pointer" }}
                                pb={3}
                                onClick={() => handleNavigate(product.id)}
                            >
                                {product.name.toUpperCase()}
                            </Typography>
                        </Grid>

                        <Grid item>
                            <Typography variant="h6">
                                {product.brand.toUpperCase()}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        xs={2}
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                display={"inline-block"}
                                mb={2}
                            >
                                Price per pcs.: ${product.price}
                            </Typography>
                        </Grid>
                        <Grid item container justifyContent="space-between">
                            <Grid item xs={2} justifyContent="center">
                                <RemoveIcon
                                    sx={{
                                        cursor: "pointer",
                                    }}
                                    onClick={handleDecrease}
                                />
                            </Grid>
                            <Grid item xs={6} justifyContent="center">
                                <TextField
                                    inputProps={{
                                        style: {
                                            padding: 1,
                                            textAlign: "center",
                                            width: "100%",
                                        },
                                        inputprops: {
                                            min: 1,
                                        },
                                    }}
                                    value={quantity}
                                    type="number"
                                    onChange={(e) =>
                                        setQuantity(+e.target.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={2} justifyContent="center">
                                <AddIcon
                                    sx={{
                                        cursor: "pointer",
                                    }}
                                    onClick={handleIncrease}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        xs={2}
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <Typography
                                variant="h6"
                                color="text.secondary"
                                display={"inline-block"}
                            >
                                Total:
                            </Typography>
                        </Grid>

                        <Grid item>
                            <Typography
                                variant="h5"
                                color="text.secondary"
                                display={"inline-block"}
                            >
                                ${product.price * item.quantity}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={1}>
                        <DeleteForeverIcon
                            sx={{
                                cursor: "pointer",
                            }}
                            color="error"
                            fontSize="large"
                            onClick={() => handleDeleteCartItem(item)}
                        />
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default CartItem;
