/* eslint-disable react-hooks/exhaustive-deps */
// ========================== react ==========================
import { FC, useEffect } from "react";

// ============================ MUI ============================
import styled from "@emotion/styled";
import { Grid, Paper, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

// =========================== Store ===========================
import { AppDispatch } from "../../store";
import { fetchOrderItems, fetchOrders } from "./store/orders.actions";

// ======================== Components =========================
import OrdersList from "../../components/orders-list.component";
import { OrderItemsSelector, OrdersSelector } from "./store/orders.selector";
import { useTranslation } from "react-i18next";
import { IOrdersColumnsTranslate, IOrdersTranslate } from "./types/orders-translate.enum";

const MainGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  width: 100%;
  min-height: 100%;
`;

const OrdersListPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const orders = useSelector(OrdersSelector);
  const order = useSelector(OrderItemsSelector);

  const { t } = useTranslation();

  const ordersTranslate: IOrdersTranslate = t("orders", {
    returnObjects: true,
  });

  const ordersWithColumnsTranslate: IOrdersColumnsTranslate = t("orders.columns", {
    returnObjects: true,
  });

  const handleGetOrderItem = (id: string) => {
    dispatch(fetchOrderItems(id));
  };

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

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
          <h2>{ordersTranslate.myOrders}</h2>
        </Paper>
      </Stack>
      <Paper
        sx={{
          display: "flex",
          margin: "36px",
        }}
        elevation={orders.length > 0 ? 5 : 0}
      >
        {orders.length > 0 ? (
          <OrdersList
            orders={orders}
            order={order}
            ordersWithColumnsTranslate={ordersWithColumnsTranslate}
            handleGetOrderItem={handleGetOrderItem}
          />
        ) : (
          <h2 data-testid="empty-stub">{ordersTranslate.emptyOrders}</h2>
        )}
      </Paper>
    </MainGrid>
  );
};

export default OrdersListPage;
