/* eslint-disable react-hooks/exhaustive-deps */
// =========================== react ===========================
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// =========================== redux ===========================
import { useDispatch, useSelector } from "react-redux";

// =========================== mui =============================
import styled from "@emotion/styled";
import { CircularProgress, Grid } from "@mui/material";

// =========================== components ======================
import OrderItemsViewTable from "../../components/order-items-view-form.component";

// =========================== store ===========================
import { AppDispatch } from "../../store";
import { fetchOrderItems } from "./store/orders.actions";
import {
  getPendingSelector,
  OrderItemsSelector,
} from "./store/orders.selector";

// =========================== styles ===========================
const MainGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  min-height: 100%;
`;

const OrderItemsViewPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { orderId } = useParams();

  const pending = useSelector(getPendingSelector);
  const orderItems = useSelector(OrderItemsSelector);

  const handleNavigateToProduct = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  useEffect(() => {
    if (orderId) dispatch(fetchOrderItems(orderId));
  }, [orderId]);

  return (
    <MainGrid>
      {(pending?.orders || pending?.orderItems) && (
        <CircularProgress
          sx={{ alignSelf: "center" }}
          data-testid="pending-stub"
        />
      )}
      {orderItems && (
        <OrderItemsViewTable
          orderItems={orderItems}
          handleNavigateToProduct={handleNavigateToProduct}
        />
      )}
    </MainGrid>
  );
};

export default OrderItemsViewPage;
