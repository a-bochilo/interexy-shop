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
  usersFetchErrorsSelector,
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
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const userList = useSelector(usersSelector);
  const userInfo = useSelector(userInfoSelector);
  const pending = useSelector(usersLoadingSelector);
  const fetchingErrors = useSelector(usersFetchErrorsSelector);
  const { userId } = useParams<string>();

  useEffect(() => {
    if (!userId) return;
    dispatch(getUserInfo(userId));
  }, [userId]);

  const buttonOnclick = () => {
    setIsClicked(true);
    setDisabled(!disabled);
  };

  const handleSave = (data: any) => {
    if (!userId) return;
    dispatch(updateUserInfo(data));
    // dispatch(getUsers());
  };

  const handleDelete = () => {
    if (!userId) return;
    dispatch(deleteUser(userId));
    navigate("/users");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleAsignRole = () => {
    navigate(`/users/assignRole/${userId}`);
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
          pending={pending}
          isClicked={isClicked}
          setDisabled={setDisabled}
          buttonOnclick={buttonOnclick}
          handleSave={handleSave}
          fetchingErrors={fetchingErrors}
          handleDelete={handleDelete}
          handleBack={handleBack}
          handleAsignRole={handleAsignRole}
        />
      ) : (
        <CircularProgress data-testid="test-progress" />
      )}
    </MainGrid>
  );
};

export default UserEditPage;
