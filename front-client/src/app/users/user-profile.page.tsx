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
  userInfoSelector,
  userSelector,
  userLoadingSelector,
} from "./store/users.selectors";
import { getUserInfo, updateUserDetails } from "./store/users.actions";
import { usersActions } from "./store/users.slice";

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
  const userInfo = useSelector(userInfoSelector);
  const user = useSelector(userSelector);
  const pending = useSelector(userLoadingSelector);
  const { userId } = useParams<string>();
  const getUser = usersActions.getUser;

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const buttonOnclick = () => {
    setDisabled(!disabled);
  };

  const handleSave = (data: any) => {
    // if (!userId) return;
    dispatch(updateUserDetails(data));
    console.log(data);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <MainGrid>
      {userInfo && user ? (
        <UserProfileFormComp
          formName={"USER PROFILE"}
          user={user}
          userInfo={userInfo}
          disabled={disabled}
          pending={pending}
          setDisabled={setDisabled}
          buttonOnclick={buttonOnclick}
          handleSave={handleSave}
          handleBack={handleBack}
        />
      ) : (
        <CircularProgress data-testid="test-progress" />
      )}
    </MainGrid>
  );
};

export default UserEditPage;
