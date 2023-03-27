// ========================== react ==========================
import { FC, useEffect, useState } from "react";

// ============================ MUI ============================
import styled from "@emotion/styled";
import { Grid, Paper, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

// =========================== Store ===========================
import { AppDispatch } from "../../store";
import { fetchOrders } from "./store/orders.actions";

// ======================== Components =========================
import OrdersList from "../../components/orders-list.component";
import { OrdersSelector } from "./store/orders.selector";
import { decodeToken } from "react-jwt";

const MainGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  width: 100%;
  min-height: 100%;
`;

interface User {
  id: string;
}

const OrdersListPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(OrdersSelector);
  const [id, setId] = useState<string>("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const user: User | null = decodeToken(token);
      if (user !== null) {
        setId(user.id);
      }
    }
    dispatch(fetchOrders());
  }, [dispatch, id]);

  return (
    <MainGrid>
      <Stack spacing={2}>
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "16px",
          }}
          elevation={0}
        >
          <h2>My orders</h2>
        </Paper>
      </Stack>
      <Paper
        sx={{
          display: "flex",
          margin: "36px",
        }}
        elevation={5}
      >
        {orders.length > 0 ? <OrdersList orders={orders} /> : <h2>YOU HAVE NO ORDERS</h2>}
      </Paper>
    </MainGrid>
  );
};

export default OrdersListPage;
