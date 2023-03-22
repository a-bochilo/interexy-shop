// =========================== react ===========================
import * as React from "react";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import { useNavigate } from "react-router-dom";

// =========================== mui ===========================
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// =========================== dto ===========================
import { UserDto } from "../app/users/types/user-dto.type";

interface ColumnData {
  dataKey: keyof UserDto;
  label: string;
  width: number;
}

const UsersTable = ({ users }: { users: UserDto[] }) => {
  const navigate = useNavigate();

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getColumns = (user: UserDto): ColumnData[] => {
    // const keys = Object.keys(user) as (keyof UserDto)[];
    const keys = [
      "id",
      "created",
      "update",
      "phone",
      "email",
      "roleType",
      "status",
    ] as (keyof UserDto)[];
    const columns = keys.map((key) => {
      return {
        width: 120,
        label: capitalizeFirstLetter(key),
        dataKey: key,
      };
    });
    return columns;
  };

  const VirtuosoTableComponents: TableComponents<UserDto> = {
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
        onClick={() => navigate(`${_item.id}`)}
        sx={{ cursor: "pointer" }}
      />
    ),
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  const fixedHeaderContent = () => {
    return users.length > 0 ? (
      <TableRow>
        {getColumns(users[0]).map((column) => (
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
      ""
    );
  };

  const rowContent = (_index: number, row: UserDto) => {
    return users.length > 0 ? (
      <>
        {getColumns(users[0]).map((column) => (
          <TableCell key={column.dataKey} align="center">
            {`${row[column.dataKey]}`}
          </TableCell>
        ))}
      </>
    ) : (
      ""
    );
  };

  return (
    <Paper style={{ height: "calc(100vh - 64px)", width: "100%" }}>
      <TableVirtuoso
        data={users}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
};

export default UsersTable;
