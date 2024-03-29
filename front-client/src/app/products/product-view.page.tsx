import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { debounce } from "lodash";
import { useTranslation } from "react-i18next";

// =========================== mui ===========================
import {
  Button,
  CardMedia,
  CircularProgress,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";

// =========================== store ===========================
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchProductDetials } from "./store/products.actions";
import {
  productDetailsSelector,
  productsPendingSelector,
  productsSelector,
} from "./store/products.selectors";
import { clearErrors } from "./store/products.slice";
import {
  addCartItem,
  fetchCart,
  updateCartItem,
} from "../cart/store/cart.actions";
import { cartErrorsSelector, cartSelector } from "../cart/store/cart.selectors";

// =========================== dto's ===========================
import { ProductWithDetailsDto } from "./types/product-with-details.dto";

// =========================== components ===========================
import CartButton from "../../components/cart-button.compoent";
import {
  ICategoriesSelector,
  ProductsCategory,
} from "./types/products-category.enum";

const ProductViewPage: FC = () => {
  // ===== hooks =====
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // ===== i18n =====
  const { t } = useTranslation();
  const productInfoTranslation: ProductWithDetailsDto = t(
    "products.productInfo",
    {
      returnObjects: true,
    }
  );
  const productsCategoriesTranslation: ICategoriesSelector = t(
    "products.categories",
    {
      returnObjects: true,
    }
  );

  // ===== params =====
  const { productId } = useParams();

  // ===== selectors =====
  const products = useAppSelector(productsSelector);
  const productDetails = useAppSelector(productDetailsSelector);
  const pending = useAppSelector(productsPendingSelector);
  const cart = useAppSelector(cartSelector);
  const cartErrors = useAppSelector(cartErrorsSelector);

  // ===== effect =====
  useEffect(() => {
    if (!productId) return;

    dispatch(fetchProductDetials(productId));
  }, [dispatch, productId]);

  let productWithDetails: ProductWithDetailsDto | undefined = undefined;
  const product = products.find((product) => product.id === productId);

  if (productDetails && product) {
    const { id, ...productDetailsWithoutId } = productDetails;
    productWithDetails = { ...product, ...productDetailsWithoutId };
  }

  const cartItem = cart?.items.find((item) => item.productId === product?.id);

  const cartItemQuantity = !!cartItem ? cartItem.quantity : 1;

  // ===== handlers =====
  const handleAddToCart = debounce(async (quantity: number) => {
    if (!productWithDetails?.id) return;

    if (!cart) {
      dispatch(fetchCart());
      return;
    }

    // ===== create new item if item does not exist in cart =====
    if (!cartItem) {
      dispatch(addCartItem({ productId: productWithDetails.id, quantity }));
      return;
    }

    // ===== update item if it exists in cart =====
    dispatch(
      updateCartItem({
        id: cartItem?.id,
        productId: productWithDetails.id,
        quantity,
      })
    );
  }, 300);

  const handleBack = () => {
    dispatch(clearErrors());
    navigate("/products");
  };

  // ===== render handlers =====
  const renderField = (
    obj: ProductWithDetailsDto,
    key: keyof ProductWithDetailsDto
  ) => {
    let value = obj[key];
    if (key === "category") {
      value = productsCategoriesTranslation[value as ProductsCategory];
    }
    return (
      <Grid container>
        <Typography
          variant="body2"
          align="right"
          pr={2}
          sx={{
            minWidth: 110,
            fontWeight: "bold",
          }}
        >
          {(productInfoTranslation[key] as string).toLowerCase()}
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
        <CircularProgress
          sx={{ alignSelf: "center" }}
          data-testid="pending-stub"
        />
      )}

      {productWithDetails && (
        <>
          <Grid item xs={6} data-testid="grid-test">
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

            <Grid item>{renderField(productWithDetails, "category")}</Grid>

            <Grid item>{renderField(productWithDetails, "brand")}</Grid>

            <Grid item>{renderField(productWithDetails, "color")}</Grid>

            <Grid item>{renderField(productWithDetails, "material")}</Grid>

            <Grid item>{renderField(productWithDetails, "size")}</Grid>

            <Grid item>{renderField(productWithDetails, "description")}</Grid>

            <Grid item container alignItems={"center"} gap={2} mt={3}>
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
                isInCart={!!cartItem}
                cartItemQuantity={cartItemQuantity}
                error={cartErrors.cart}
              />
              <Tooltip title="Back to all">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleBack()}
                  data-testid="btn-back-test"
                >
                  <UndoIcon color="primary" fontSize="large" />
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
