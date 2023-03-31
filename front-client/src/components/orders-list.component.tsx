// ========================== react ==========================
import * as React from "react";
import { useState } from "react";

// ========================== mui ==========================
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

// ========================== enums & types =================
import { IOrdersColumnsTranslate } from "../app/orders/types/orders-translate.enum";
import { OrderItemDto } from "../app/orders/types/order-item.dto";
import { OrderDto } from "../app/orders/types/order.dto";



const correctDate = (created: string) => new Date(created).toLocaleString();

const Row = ({
  orders,
  order,
  ordersWithColumnsTranslate,
  handleGetOrderItem,
}: {
  orders: OrderDto;
  order: OrderItemDto[];
  ordersWithColumnsTranslate: IOrdersColumnsTranslate;
  handleGetOrderItem: (s: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = (toggle: boolean, id: string) => {
    handleGetOrderItem(id);
    setOpen(toggle);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleClick(!open, orders.id)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {orders.id.split("-").reverse()[0]}
        </TableCell>
        <TableCell align="right">
          {correctDate(orders.created.toString())}
        </TableCell>
        <TableCell align="right">{orders.total} $</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="medium" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {ordersWithColumnsTranslate.product}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      {ordersWithColumnsTranslate.quantity}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      {ordersWithColumnsTranslate.price}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      {ordersWithColumnsTranslate.orderTotal} ($)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!!order.length
                    ? order.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {item.product_name}
                          </TableCell>
                          <TableCell align="right">
                            {item.product_quantity}
                          </TableCell>
                          <TableCell align="right">
                            {item.product_price} $
                          </TableCell>
                          <TableCell align="right">
                            {Math.round(
                              item.product_quantity * item.product_price * 100
                            ) / 100}{" "}
                            $
                          </TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const OrdersListTable = ({
  orders,
  order,
  ordersWithColumnsTranslate,
  handleGetOrderItem,
}: {
  orders: OrderDto[];
  order: OrderItemDto[];
  ordersWithColumnsTranslate: IOrdersColumnsTranslate;
  handleGetOrderItem: (s: string) => void;
}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sx={{ fontWeight: "bold" }}>
              {ordersWithColumnsTranslate.orderNumber}
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              {ordersWithColumnsTranslate.orderCreated}
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              {ordersWithColumnsTranslate.orderTotal}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((item) => (
            <Row
              key={item.id}
              orders={item}
              order={order}
              handleGetOrderItem={() => handleGetOrderItem(item.id)}
              ordersWithColumnsTranslate={ordersWithColumnsTranslate}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default OrdersListTable;
