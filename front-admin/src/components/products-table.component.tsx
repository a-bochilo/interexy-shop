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

    const fixedHeaderContent = () => {
        return (
            <TableRow>
                {columns.map((column) => (
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
        );
    };

    const rowContent = (_index: number, row: ProductDto) => {
        return (
            <>
                {columns.map((column) => (
                    <TableCell key={column.dataKey} align="center">
                        {`${row[column.dataKey]}`}
                    </TableCell>
                ))}
            </>
        );
    };

    return (
        <Paper style={{ height: "calc(100vh - 64px)", width: "100%" }}>
            <TableVirtuoso
                data={products}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
            />
        </Paper>
    );
};

export default ProductsTable;
