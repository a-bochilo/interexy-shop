// import * as React from "react";

// // =========================== MUI ===========================
// import Paper from "@mui/material/Paper";

// // ====================== Interfaces & DTO's ==================
import { OrderDto } from "../app/orders/types/order.dto";
// import { Box, Typography } from "@mui/material";

// const OrdersList = ({
//   orders,
//   handleClickOnOrder,
// }: {
//   orders: OrderDto[];
//   handleClickOnOrder: (s: string) => void;
// }) => {
//   return (
//     <Box
//       sx={{
//         margin: "16px",
//         minWidth: "100%",
//         minHeight: "100%",
//         justifyContent: "center",
//         p: 3,
//       }}
//     >
//       {orders.map((item, index) => {
//         return (
//           <Paper
//             sx={{
//               padding: "8px",
//               justifyContent: "space-around",
//             }}
//             key={index}
//             elevation={6}
//             onClick={() => handleClickOnOrder(item.id)}
//           >
//             <Typography>Order number: {item.id.split('-').reverse()[0]}</Typography>
//             <Typography>Order created: {item.created}</Typography>
//             <Typography>Total: {item.total} BYN</Typography>
//           </Paper>
//         );
//       })}
//     </Box>
//   );
// };

// export default OrdersList;

import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import { fetchOrderItems } from "../app/orders/store/orders.actions";
import { useDispatch, useSelector } from "react-redux";
import { OrderItemsSelector } from "../app/orders/store/orders.selector";
import { AppDispatch } from "../store";

function Row(props: { orders: OrderDto }) {
  const { orders } = props;
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const order = useSelector(OrderItemsSelector);

  const handleGetOrderItem = (toggle: boolean, id: string) => {
    dispatch(fetchOrderItems(id));
    setOpen(toggle);
  };

  const correctDate = (created: string) => new Date(created).toLocaleString();

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleGetOrderItem(!open, orders.id)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {orders.id.split("-").reverse()[0]}
        </TableCell>
        <TableCell align="right">{correctDate(orders.created.toString())}</TableCell>
        <TableCell align="right">{orders.total} $</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="medium" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{fontWeight: "bold"}} >Product</TableCell>
                    <TableCell sx={{fontWeight: "bold"}} align="right">Quantity</TableCell>
                    <TableCell sx={{fontWeight: "bold"}} align="right">Price</TableCell>
                    <TableCell sx={{fontWeight: "bold"}} align="right">Total ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {item.product_name}
                      </TableCell>
                      <TableCell align="right">{item.product_quantity}</TableCell>
                      <TableCell align="right">{item.product_price} $</TableCell>
                      <TableCell align="right">
                        {Math.round(item.product_quantity * item.product_price * 100) /
                          100} $  
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const OrdersListTable = ({ orders }: { orders: OrderDto[] }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sx={{fontWeight: "bold"}} >Order number</TableCell>
            <TableCell sx={{fontWeight: "bold"}} align="right">Order created</TableCell>
            <TableCell sx={{fontWeight: "bold"}} align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((item) => (
            <Row key={item.id} orders={item} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default OrdersListTable;
