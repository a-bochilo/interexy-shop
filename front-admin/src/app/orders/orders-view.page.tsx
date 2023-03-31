/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// =========================== MUI ===========================
import styled from "@emotion/styled";
import { CircularProgress, Grid } from "@mui/material";

// =========================== Components ===========================
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchOrderItems } from "./store/orders.actions";
import {
  getPendingSelector,
  OrderItemsSelector,
} from "./store/orders.selector";
import OrderItemsViewTable from "../../components/order-items-view-form.component";

// =========================== DTO's ===========================

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
