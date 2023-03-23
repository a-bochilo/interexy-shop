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
import { ProductDetailsDto } from "../app/products/types/product-details.dto";

interface ColumnData {
    dataKey: 0 | 1;
    label: string;
    width: number;
}

const ProductTable = ({
    product,
    productDetails,
}: {
    product: ProductDto;
    productDetails: ProductDetailsDto;
}) => {
    const columns: ColumnData[] = [
        {
            dataKey: 0,
            label: "Property",
            width: 120,
        },
        {
            dataKey: 1,
            label: "Value",
            width: 300,
        },
    ];

    const VirtuosoTableComponents: TableComponents<[string, string | number]> =
        {
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
                    // onClick={() => handleClickRow(_item.id)}
                    sx={{ cursor: "pointer" }}
                />
            ),
            TableBody: React.forwardRef<HTMLTableSectionElement>(
                (props, ref) => <TableBody {...props} ref={ref} />
            ),
        };

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

    const rowContent = (_index: number, row: [string, string | number]) => {
        if (
            (row[0] === "created" || row[0] === "updated") &&
            typeof row[1] !== "string"
        ) {
            row[1] = new Date(row[1]).toLocaleString();
        }
        return (
            <>
                {columns.map((column) => (
                    <TableCell
                        key={column.dataKey}
                        align="center"
                        sx={{ fontWeight: !!column.dataKey ? null : "bold" }}
                    >
                        {`${row[column.dataKey]}`}
                    </TableCell>
                ))}
            </>
        );
    };

    const productDetailsWithoutId: Partial<ProductDetailsDto> = {
        ...productDetails,
    };
    delete productDetailsWithoutId.id;

    return (
        <Paper
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            <TableVirtuoso
                data={[
                    ...Object.entries(product),
                    ...Object.entries(productDetailsWithoutId),
                ]}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
            />
        </Paper>
    );
};

export default ProductTable;
