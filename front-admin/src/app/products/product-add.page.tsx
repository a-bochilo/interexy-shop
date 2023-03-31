import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

// =========================== mui ===========================
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

// =========================== store ===========================
import { useAppDispatch, useAppSelector } from "../../store";
import { createProduct } from "./store/products.actions";
import {
  productsErrorsSelector,
  productsPendingSelector,
} from "./store/products.selectors";
import { clearErrors } from "./store/products.slice";

// =========================== components ===========================
import ProductAddForm from "../../components/product-add-form.component";

// =========================== dto's ===========================
import { ProductCreateDto } from "./types/product-create.dto";

// =========================== styled ===========================
const MainGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  justify-content: center;
  width: 100%;
  min-height: 100%;
`;

const ProductAddPage: FC = () => {
  // ===== hooks =====
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // ===== local state =====
  const [isClicked, setIsClicked] = useState<boolean>(false);

  // ===== selectors =====
  const pending = useAppSelector(productsPendingSelector);
  const errors = useAppSelector(productsErrorsSelector);

  const handleSave = async (product: ProductCreateDto) => {
    dispatch(clearErrors());
    const { type } = await dispatch(createProduct(product));
    setIsClicked(true);
    return !type.endsWith("rejected");
  };
  const handleBack = () => {
    dispatch(clearErrors());
    navigate("/products");
  };

  return (
    <MainGrid>
      <ProductAddForm
        pending={pending}
        fetchingErrors={errors}
        isClicked={isClicked}
        handleSave={handleSave}
        handleBack={handleBack}
      />
    </MainGrid>
  );
};

export default ProductAddPage;
