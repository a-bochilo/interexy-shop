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

const RolesTable = ({ roles }: { roles: RolesDto[] }) => {
  const navigate = useNavigate();

  interface ColumnData {
    dataKey: keyof RolesDto;
    label: string;
    width: number;
  }

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getColumns = (role: RolesDto): ColumnData[] => {
    const keys = Object.keys(role) as (keyof RolesDto)[];
    const columns = keys.map((key) => {
      return {
        width: 120,
        label: capitalizeFirstLetter(key),
        dataKey: key,
      };
    });
    return columns;
  };

  const VirtuosoTableComponents: TableComponents<RolesDto> = {
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
      <TableRow {...props} sx={{ cursor: "pointer" }} 
      onClick={() => navigate(`${_item.id}`)}
      />
    ),
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  const fixedHeaderContent = () => {
    return roles.length > 0 ? (
      <TableRow>
        {getColumns(roles[0]).map((column) => (
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

  const rowContent = (_index: number, row: RolesDto) => {
    const stringPermissions = row["permissions"]?.join(", ");
    const newRow = {...row, permissions: stringPermissions};
    return roles.length > 0 ? (
      <>
        {getColumns(roles[0]).map((column) => {
          return (
            <TableCell key={column.dataKey} 
            align="center"
            >
              {`${newRow[column.dataKey]}`}
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
        data={roles}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
};

export default RolesTable;
