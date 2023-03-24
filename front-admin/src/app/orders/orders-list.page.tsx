// ========================== react ==========================
import { FC, useEffect } from "react";

// ============================ MUI ============================
import styled from "@emotion/styled";
import { CircularProgress, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

// =========================== Store ===========================
import { AppDispatch } from "../../store";
import { OrdersSelector, getPendingSelector } from "./store/orders.selector";
import { fetchOrders } from "./store/orders.actions";

// ======================== Components =========================
import OrdersTable from "../../components/orders-table.component";

const MainGrid = styled(Grid)`
  display: flex;
  align-items: top;
  justify-content: space-around;
  width: 100%;
  min-height: 100%;
`;

const OrdersListPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(OrdersSelector);
  const pending = useSelector(getPendingSelector);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (
    <MainGrid>
      {pending.orders && <CircularProgress sx={{ alignSelf: "center" }} />}
      {!!orders.length && !pending.orders && <OrdersTable orders={orders} />}
    </MainGrid>
  );
};

export default OrdersListPage;
