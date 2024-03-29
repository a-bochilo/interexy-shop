// =========================== react =========================================
import React from "react";
import { useNavigate } from "react-router-dom";
import { TableVirtuoso, TableComponents } from "react-virtuoso";

// =========================== mui ===========================================
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

// =========================== interfaces & dto's =============================
import { OrderItemDto } from "../app/orders/types/order-item.dto";

interface ColumnData {
  dataKey: keyof OrderItemDto;
  label: string;
  width: number;
}

const correctDate = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleString();
};

const OrderItemsViewTable = ({
  orderItems,
  handleNavigateToProduct,
}: {
  orderItems: OrderItemDto[];
  handleNavigateToProduct: (s: string) => void;
}) => {
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
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
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
          const isProductId = Boolean(column.dataKey === "product_id");
          return (
            <TableCell
              sx={{
                textDecoration: isProductId ? "underline" : null,
                cursor: isProductId ? "pointer" : null,
              }}
              key={column.dataKey}
              align="center"
              onClick={() =>
                column.dataKey === "product_id" &&
                handleNavigateToProduct(row[column.dataKey])
              }
            >
              {column.dataKey === "created" || column.dataKey === "updated"
                ? `${correctDate(row[column.dataKey])}`
                : `${row[column.dataKey]}`}
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
        data-testid="order-items-table"
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
