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

// =========================== Interfaces & DTO's ===========================
import { RolesDto } from "../app/roles/types/roles.dto";
import { useNavigate } from "react-router";
import { UserRoles } from "../app/roles/types/user-roles.enum";
import { OrderItemDto } from "../app/orders/types/order-item.dto";
import { Button } from "@mui/material";

interface ColumnData {
  dataKey: keyof OrderItemDto;
  label: string;
  width: number;
}

const OrderItemsViewTable = ({
  orderItems,
  handleBack,
}: {
  orderItems: OrderItemDto[];
  handleBack: () => void;
}) => {
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
    <Paper style={{ minHeight: "calc(100vh - 64px)", minWidth: "100%" }}>
      <Button
        onClick={handleBack}
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
      />
    </Paper>
  );
};

export default OrderItemsViewTable;