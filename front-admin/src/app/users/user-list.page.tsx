// ========================== react ==========================
import { FC, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// ========================== mui ==========================
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

// ========================== selectors ==========================
import { usersLoadingSelector, usersSelector } from "./store/users.selectors";

// ========================== store ==========================
import { AppDispatch } from "../../store";
import { getUsers } from "./store/users.actions";
import { UserDto } from "./types/user-dto.type";

// ========================== components ==========================
import { UserCard } from "../../components/user-card.comp";

const MainGrid = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserListPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userList = useSelector(usersSelector);
  const isUserListLoading = useSelector(usersLoadingSelector);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  // mui Virtualized table с кликабельными полями

  const allUsers = useMemo(() => {
    return userList.map((user: UserDto) => (
      <UserCard key={user.id} user={user} />
    ));
  }, [userList]);

  return <MainGrid sx={{ display: "flex" }}>{allUsers}</MainGrid>;
};

export default UserListPage;
