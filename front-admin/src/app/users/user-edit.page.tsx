// ========================== react ==========================
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// ========================== mui ==========================
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { CircularProgress } from "@mui/material";

// ========================== components ==========================
import UserEditFormComp from "../../components/user-edit-form.comp";

// ========================== store ==========================
import { AppDispatch } from "../../store";
import {
  userInfoSelector,
  usersSelector,
  usersLoadingSelector,
} from "./store/users.selectors";
import {
  deleteUser,
  getUserInfo,
  getUsers,
  updateUserInfo,
} from "./store/users.actions";

const MainGrid = styled(Grid)`
  justify-content: center;
  align-items: center;
  padding: 10px;
  display: flex;
  width: 100%;
  min-height: 100%;
`;

const UserEditPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const userList = useSelector(usersSelector);
  const userInfo = useSelector(userInfoSelector);
  const usersLoading = useSelector(usersLoadingSelector);
  const { userId } = useParams<string>();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (!userId) return;
    dispatch(getUserInfo(userId));
  }, [userId]);

  const buttonOnclick = () => {
    setDisabled(!disabled);
  };

  const handleSave = (data: any) => {
    if (!userId) return;
    dispatch(updateUserInfo(data));
  };

  const handleDelete = () => {
    if (!userId) return;
    dispatch(deleteUser(userId));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const selectedUser = userList.find((user) => user.id === userId);

  return (
    <MainGrid>
      {userInfo && selectedUser ? (
        <UserEditFormComp
          formName={"Edit user"}
          userInfo={userInfo}
          selectedUser={selectedUser}
          disabled={disabled}
          pending={usersLoading}
          setDisabled={setDisabled}
          buttonOnclick={buttonOnclick}
          handleSave={handleSave}
          handleDelete={handleDelete}
          handleBack={handleBack}
        />
      ) : (
        <CircularProgress />
      )}
    </MainGrid>
  );
};

export default UserEditPage;
