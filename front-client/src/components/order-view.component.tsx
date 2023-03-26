import { Box, Paper, Typography } from "@mui/material";
import { OrderItemDto } from "../app/orders/types/order-item.dto";

const OrderViewForm = ({ order }: { order: OrderItemDto[] }) => {
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
      {order.map((item, index) => {
        return (
          <Paper
            sx={{
              padding: "8px",
              justifyContent: "space-around",
            }}
            key={index}
            elevation={6}
          >
            <Typography>Product: {item.product_name}</Typography>
            <Typography>Quantity: {item.product_quantity}</Typography>
            <Typography>Price: {item.product_price} BYN</Typography>
            <Typography>
              Total: {item.product_quantity * item.product_price} BYN
            </Typography>
          </Paper>
        );
      })}
    </Box>
  );
};

export default OrderViewForm;
