/* eslint-disable react-hooks/exhaustive-deps */
// ========================== react ==========================
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// ========================== mui ==========================
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { CircularProgress } from "@mui/material";

// ========================== components ==========================
import UserProfileFormComp from "../../components/user-profile-form.comp";

// ========================== interfaces ==========================
import { IUserWithTranslate } from "./types/user-translate.interface";

// ========================== store ==========================
import { AppDispatch } from "../../store";
import {
  userInfoSelector,
  userSelector,
  userLoadingSelector,
  userErrorsSelector,
} from "./store/users.selectors";
import { getUserInfo, updateUserDetails } from "./store/users.actions";
import { usersActions } from "./store/users.slice";

// ========================== i18n ==========================
import { useTranslation } from "react-i18next";


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
  const fetchingErrors = useSelector(userErrorsSelector);
  const getUser = usersActions.getUser;

  const { t } = useTranslation();

  const userWithTranslate: IUserWithTranslate = t("user", {
    returnObjects: true,
  });

  const [isClicked, setIsClicked] = useState(false);

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
    setIsClicked(true);
    dispatch(updateUserDetails(data));
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <MainGrid>
      {userInfo && user ? (
        <UserProfileFormComp
          isClicked={isClicked}
          user={user}
          userInfo={userInfo}
          disabled={disabled}
          pending={pending}
          fetchingErrors={fetchingErrors.userInfo}
          setDisabled={setDisabled}
          buttonOnclick={buttonOnclick}
          handleSave={handleSave}
          handleBack={handleBack}
          userWithTranslate={userWithTranslate}
        />
      ) : (
        <CircularProgress data-testid="test-progress" />
      )}
    </MainGrid>
  );
};

export default UserEditPage;
