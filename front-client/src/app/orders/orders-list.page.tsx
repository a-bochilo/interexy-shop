// ========================== react ==========================
import { FC, useEffect, useState } from "react";

// ============================ MUI ============================
import styled from "@emotion/styled";
import { CircularProgress, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

// =========================== Store ===========================
import { AppDispatch } from "../../store";
import { fetchOrderItems, fetchOrders } from "./store/orders.actions";

// ======================== Components =========================
import OrdersList from "../../components/orders-list.component";
import { OrderItemsSelector, OrdersSelector } from "./store/orders.selector";
import { decodeToken } from "react-jwt";
import OrderViewForm from "../../components/order-view.component";

const MainGrid = styled(Grid)`
  display: flex;
  align-items: top;
  justify-content: space-between;
  width: 100%;
  min-height: 100%;
`;

interface User {
  id: string;
}

const OrdersListPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(OrdersSelector);
  const order = useSelector(OrderItemsSelector);
  const [id, setId] = useState<string>("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const user: User | null = decodeToken(token);
      if (user !== null) {
        setId(user.id);
      }
    }
    dispatch(fetchOrders(id));
  }, [dispatch, id]);

  const handleClickOnOrder = (orderId: string) => {
    dispatch(fetchOrderItems(orderId));
  };

  return (
    <MainGrid>
      <Grid item xs={6}>
        {orders.length > 0 ? (
          <OrdersList orders={orders} handleClickOnOrder={handleClickOnOrder} />
        ) : (
          <h2>
            YOU HAVE NO ORDERS
          </h2>
        )}
      </Grid>
      <Grid item xs={6}>
        <OrderViewForm order={order} />
      </Grid>
    </MainGrid>
  );
};

export default OrdersListPage;
