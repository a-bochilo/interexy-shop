import * as React from "react";
import { TableVirtuoso, TableComponents } from "react-virtuoso";

// =========================== mui ===========================
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// =========================== interfaces & dto's ===========================
import { ProductDto } from "../app/products/types/product.dto";

const ProductsTable = ({
  products,
  handleClickRow,
}: {
  products: ProductDto[];
  handleClickRow: (id: string) => void;
}) => {
  interface ColumnData {
    dataKey: keyof ProductDto;
    label: string;
    width: number;
  }

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getColumns = (product: ProductDto): ColumnData[] => {
    const keys = Object.keys(product) as (keyof ProductDto)[];
    const columns = keys.map((key) => {
      return {
        width: 120,
        label: capitalizeFirstLetter(key),
        dataKey: key,
      };
    });
    return columns;
  };
  const columns = getColumns(products[0]);

  // ===== table config =====
  const VirtuosoTableComponents: TableComponents<ProductDto> = {
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
        onClick={() => handleClickRow(_item.id)}
        sx={{ cursor: "pointer" }}
      />
    ),
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  // ===== render handlers =====
  const fixedHeaderContent = () => {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align="center"
            style={{ width: column.width, fontWeight: "bold" }}
            sx={{
              backgroundColor: "background.paper",
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  };

  const rowContent = (_index: number, row: ProductDto) => {
    return (
      <>
        {columns.map((column) => {
          let date: string | null = null;
          if (
            (column.dataKey === "created" || column.dataKey === "updated") &&
            typeof row[column.dataKey] !== "string"
          ) {
            date = new Date(row[column.dataKey]).toLocaleString();
          }
          return (
            <TableCell key={column.dataKey} align="center">
              {date ? `${date}` : `${row[column.dataKey]}`}
            </TableCell>
          );
        })}
      </>
    );
  };

  return (
    <Paper
      style={{
        width: "100%",
        minHeight: "100%",
      }}
    >
      <TableVirtuoso
        data={products}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
        initialItemCount={1}
      />
    </Paper>
  );
};

export default ProductsTable;
