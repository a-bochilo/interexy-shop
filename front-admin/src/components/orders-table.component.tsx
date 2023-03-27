

import * as React from "react";
import { TableVirtuoso, TableComponents } from "react-virtuoso";

// =========================== MUI ===========================
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// ====================== Interfaces & DTO's ==================
import { OrderDto } from "../app/orders/types/order.dto";

interface ColumnData {
  dataKey: keyof OrderDto;
  label: string;
  width: number;
}

const OrdersTable = ({ orders }: { orders: OrderDto[] }) => {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getColumns = (role: OrderDto): ColumnData[] => {
    const keys = Object.keys(role) as (keyof OrderDto)[];
    const columns = keys.map((key) => {
      return {
        width: 120,
        label: capitalizeFirstLetter(key),
        dataKey: key,
      };
    });
    return columns;
  };

  const VirtuosoTableComponents: TableComponents<OrderDto> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => (
      <TableRow 
      {...props} 
      />
    ),
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  const fixedHeaderContent = () => {
    return orders.length > 0 ? (
      <TableRow>
        {getColumns(orders[0]).map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align="center"
            style={{ width: column.width }}
            sx={{
              backgroundColor: "background.paper",
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    ) : (
      <></>
    );
  };

  const rowContent = (_index: number, row: OrderDto) => {
    return orders.length > 0 ? (
      <>
        {getColumns(orders[0]).map((column) => {
          return (
            <TableCell key={column.dataKey} 
            align="center"
            >
              {`${row[column.dataKey]}`}
            </TableCell>
          );
        })}
      </>
    ) : (
      <></>
    );
  };

  return (
    <Paper style={{ minHeight: "calc(100vh - 64px)", minWidth: "100%" }}>
      <TableVirtuoso
        data={orders}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
};

export default OrdersTable;
