// ========================== react ==========================
import { FC } from "react";
import { useSelector } from "react-redux";

// ========================== mui ==========================
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

// ========================== components ==========================
import UsersTable from "../../components/users-table.comp";

// ========================== store ==========================
import { usersSelector } from "./store/users.selectors";

const MainGrid = styled(Grid)`
  display: flex;
  align-items: top;
  justify-content: space-around;
  width: 100%;
  min-height: 100%;
`;

const UserListPage: FC = () => {
  const userList = useSelector(usersSelector);

  return (
    <MainGrid sx={{ display: "flex" }}>
      <UsersTable users={userList} />
    </MainGrid>
  );
};

export default UserListPage;
