import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// =========================== MUI ===========================
import styled from "@emotion/styled";
import { CircularProgress, Grid } from "@mui/material";


// =========================== Components ===========================
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchOrderItems } from "./store/orders.actions";
import { getPendingSelector, OrderItemsSelector } from "./store/orders.selector";
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
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { orderId } = useParams();
    const pending = useSelector(getPendingSelector);
    const orderItems = useSelector(OrderItemsSelector);
    

    useEffect(() => {
        if(orderId)
            dispatch(fetchOrderItems(orderId))
    }, [dispatch, orderId])

    const handleBack = () => {
        navigate("/roles");
    }

  return (
    <MainGrid>
      {(pending.orders || pending.orderItems) && (
        <CircularProgress sx={{ alignSelf: "center" }} />
      )}
      {orderItems && (
        <OrderItemsViewTable
          orderItems={orderItems}
          handleBack={handleBack}
        />
      )}
    </MainGrid>
  );
};

export default OrderItemsViewPage;
