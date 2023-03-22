// ========================== react ==========================
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// ========================== mui ==========================
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

// ========================== components ==========================
import UsersTable from "../../components/users-table.comp";

// ========================== store ==========================
import { AppDispatch } from "../../store";
import { usersSelector } from "./store/users.selectors";
import { getUsers } from "./store/users.actions";

const MainGrid = styled(Grid)`
    display: flex;
    align-items: top;
    justify-content: space-around;
    width: 100%;
    min-height: 100%;
`;

const UserListPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userList = useSelector(usersSelector);
  console.log(userList);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <MainGrid sx={{ display: "flex" }}>
      <UsersTable users={userList} />
    </MainGrid>
  );
};

export default UserListPage;
