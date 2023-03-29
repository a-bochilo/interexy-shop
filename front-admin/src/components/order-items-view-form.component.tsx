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
import { Button } from "@mui/material";

// =========================== Interfaces & DTO's ===========================
import { OrderItemDto } from "../app/orders/types/order-item.dto";
import { useNavigate } from "react-router-dom";

interface ColumnData {
  dataKey: keyof OrderItemDto;
  label: string;
  width: number;
}

const OrderItemsViewTable = ({ orderItems }: { orderItems: OrderItemDto[] }) => {
  const navigate = useNavigate();
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getColumns = (orderItems: OrderItemDto): ColumnData[] => {
    const keys = Object.keys(orderItems) as (keyof OrderItemDto)[];
    const columns = keys.map((key) => {
      return {
        width: 120,
        label: capitalizeFirstLetter(key),
        dataKey: key,
      };
    });
    return columns;
  };

  const VirtuosoTableComponents: TableComponents<OrderItemDto> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: "separate", tableLayout: "fixed" }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  const fixedHeaderContent = () => {
    return orderItems.length > 0 ? (
      <TableRow>
        {getColumns(orderItems[0]).map((column) => (
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

  const rowContent = (_index: number, row: OrderItemDto) => {
    return orderItems.length > 0 ? (
      <>
        {getColumns(orderItems[0]).map((column) => {
          return (
            <TableCell key={column.dataKey} align="center">
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
    <>
      <Button
        onClick={() => navigate(-1)}
        sx={{
          width: "100%",
        }}
        variant="contained"
        color="primary"
      >
        BACK TO ORDERS
      </Button>
      <TableVirtuoso
        data={orderItems}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
        initialItemCount={1}
      />
    </>
  );
};

export default OrderItemsViewTable;
