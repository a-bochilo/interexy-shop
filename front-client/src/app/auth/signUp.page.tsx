// ========================== react ==========================
import { FC } from "react";

// ========================== components ==========================
import SignUpForm from "../../components/signUp-form.component";

// ========================== mui ==========================
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignUp } from "./store/auth.actions";
import { AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { AuthErrorSelector, AuthPendingSelector } from "./store/auth.selector";
import { clearErrors } from "./store/auth.slice";
import { useTranslation } from "react-i18next";
import { IAuthTranslate } from "./types/auth-translate.interface";
import { IFormInput } from "./types/form-input.interface";

export const buildUserForDB = (data: IFormInput) => {
  return {
    email: data.email,
    password: data.password,
    phone: data?.phone,
    details: {
      firstname: data.firstName,
      middlename: data?.middleName,
      lastname: data.lastName,
    },
  };
};

export const checkTokenStatus = (
  requestStatus: string,
  tokenPayload: string,
  navigate: (path: string) => void
) => {
  if (requestStatus !== "rejected") {
    window.localStorage.setItem("token", tokenPayload);
    navigate("/products");
  } else {
    return;
  }
};

const SignUpPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const { t } = useTranslation();

  const fetchingErrors = useSelector(AuthErrorSelector);
  const fetchingPending = useSelector(AuthPendingSelector);

  const handleSignUp = async (data: ISignUpTemplate) => {
    dispatch(clearErrors());

    const newToken = await dispatch(fetchSignUp(buildUserForDB(data)));
    checkTokenStatus(newToken.meta.requestStatus, newToken.payload, navigate);
  };

  const authWithTranslate: IAuthTranslate = t("auth", {
    returnObjects: true,
  });

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: "400px",
      }}
    >
      <SignUpForm
        handleSignUp={handleSignUp}
        fetchingErrors={fetchingErrors.token}
        fetchingPending={fetchingPending.token}
        authWithTranslate={authWithTranslate}
      />
    </Grid>
  );
};

export default SignUpPage;
