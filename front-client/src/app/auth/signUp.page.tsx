// ========================== react ==========================
import { FC } from "react";

// ========================== components ==========================
import SignUpForm from "../../components/signUp-form.component";

// ========================== mui ==========================
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignUp } from "./store/auth.actions";
import { ISignUpTemplate } from "./types/signUp.interface";
import { AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { AuthErrorSelector, AuthPendingSelector } from "./store/auth.selector";
import { clearErrors } from "./store/auth.slice";
import { useTranslation } from "react-i18next";
import { IAuthTranslate } from "./types/auth-translate.interface";

const SignUpPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const fetchingErrors = useSelector(AuthErrorSelector);
  const fetchingPending = useSelector(AuthPendingSelector);

  const handleSignUp = async (data: ISignUpTemplate) => {
    dispatch(clearErrors());
    const newToken = await dispatch(fetchSignUp(data));
    if (newToken.meta.requestStatus !== "rejected") {
      window.localStorage.setItem("token", newToken.payload);
      navigate("/products");
    }
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
