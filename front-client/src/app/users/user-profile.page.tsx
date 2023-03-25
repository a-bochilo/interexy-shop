// ========================== react ==========================
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// ========================== mui ==========================
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { CircularProgress } from "@mui/material";

// ========================== components ==========================
import UserProfileFormComp from "../../components/user-profile-form.comp";

// ========================== store ==========================
import { AppDispatch } from "../../store";
import {
  usersSelector,
  usersLoadingSelector,
  userSelector,
} from "./store/users.selectors";
import { getUser } from "./store/users.actions";

// ========================== dto ==========================
import { UserDto } from "./types/user-dto.type";

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
  const user = useSelector(userSelector);
  const userList = useSelector(usersSelector);
  const usersLoading = useSelector(usersLoadingSelector);
  const { userId } = useParams<string>();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const buttonOnclick = () => {
    setDisabled(!disabled);
  };

  // const handleSave = (data: any) => {
  //   if (!userId) return;
  //   dispatch(updateUserInfo(data));
  // };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <MainGrid>
      {user ? (
        <UserProfileFormComp
          formName={"USER PROFILE"}
          user={user}
          disabled={disabled}
          pending={usersLoading}
          setDisabled={setDisabled}
          buttonOnclick={buttonOnclick}
          // handleSave={handleSave}
          handleBack={handleBack}
        />
      ) : (
        <CircularProgress />
      )}
    </MainGrid>
  );
};

export default UserEditPage;
