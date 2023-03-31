import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// =========================== mui ===========================
import styled from "@emotion/styled";
import { CircularProgress, Grid } from "@mui/material";

// =========================== store ===========================
import { useAppDispatch, useAppSelector } from "../../store";
import {
  deleteProduct,
  fetchProductDetials,
  updateProduct,
} from "./store/products.actions";
import {
  productDetailsSelector,
  productsErrorsSelector,
  productsPendingSelector,
  productsSelector,
} from "./store/products.selectors";
import { clearErrors } from "./store/products.slice";

// =========================== components ===========================
import ProductEditForm from "../../components/product-edit-form.component";

// =========================== dto's ===========================
import { ProductWithDetailsDto } from "./types/product-with-details.dto";

const MainGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  justify-content: center;
  width: 100%;
  min-height: 100%;
`;

const ProductViewPage: FC = () => {
  // ===== hooks =====
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // ===== local state =====
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  // ===== params =====
  const { productId } = useParams();

  // ===== selectors =====
  const products = useAppSelector(productsSelector);
  const productDetails = useAppSelector(productDetailsSelector);
  const pending = useAppSelector(productsPendingSelector);
  const errors = useAppSelector(productsErrorsSelector);

  // ===== effects =====
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

  // ===== handlers =====
  const handleDelete = async (id: string) => {
    dispatch(clearErrors());
    const result = await dispatch(deleteProduct(id));
    setIsClicked(true);
    if (result.type.endsWith("rejected")) return;
    navigate("/products");
  };
  const handleSave = (product: Partial<ProductWithDetailsDto>) => {
    dispatch(clearErrors());
    dispatch(updateProduct(product));
    setIsClicked(true);
  };
  const handleBack = () => {
    dispatch(clearErrors());
    navigate("/products");
  };

  return (
    <MainGrid>
      {(pending.products || pending.productDetails) && (
        <CircularProgress
          sx={{ alignSelf: "center" }}
          data-testid="pending-stub"
        />
      )}
      {!!productWithDetails && (
        <ProductEditForm
          product={productWithDetails}
          pending={pending}
          fetchingErrors={errors}
          isEditable={isEditable}
          isClicked={isClicked}
          setIsEditable={setIsEditable}
          handleDelete={handleDelete}
          handleSave={handleSave}
          handleBack={handleBack}
        />
      )}
    </MainGrid>
  );
};

export default ProductViewPage;
