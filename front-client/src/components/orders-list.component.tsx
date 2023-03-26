import * as React from "react";

// =========================== MUI ===========================
import Paper from "@mui/material/Paper";

// ====================== Interfaces & DTO's ==================
import { OrderDto } from "../app/orders/types/order.dto";
import { Box, Typography } from "@mui/material";

const OrdersList = ({
  orders,
  handleClickOnOrder,
}: {
  orders: OrderDto[];
  handleClickOnOrder: (s: string) => void;
}) => {
  return (
    <Box
      sx={{
        margin: "16px",
        minWidth: "100%",
        minHeight: "100%",
        justifyContent: "center",
        p: 3,
      }}
    >
      {orders.map((item, index) => {
        return (
          <Paper
            sx={{
              padding: "8px",
              justifyContent: "space-around",
            }}
            key={index}
            elevation={6}
            onClick={() => handleClickOnOrder(item.id)}
          > 
            <Typography>Order number: {item.id.split('-').reverse()[0]}</Typography>
            <Typography>Order created: {item.created}</Typography>
            <Typography>Total: {item.total} BYN</Typography>
          </Paper>
        );
      })}
    </Box>
  );
};

export default OrdersList;
