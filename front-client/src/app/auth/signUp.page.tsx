// ========================== react ==========================
import { FC } from "react";

// ========================== components ==========================
import SignUpForm from "../../components/signUp-form.component";

// ========================== mui ==========================
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IFormInput } from "./types/form-input.interface";
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
  const fetchingErrors = useSelector(AuthErrorSelector);
  const fetchingPending = useSelector(AuthPendingSelector);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const authWithTranslate: IAuthTranslate = t("auth", {
    returnObjects: true,
  });

  const handleSignUp = async (data: IFormInput) => {
    dispatch(clearErrors());
    const user: ISignUpTemplate = {
      email: data.email,
      password: data.password,
      phone: data?.phone || "",
      details: {
        firstname: data?.firstName || "",
        middlename: data?.middleName || "",
        lastname: data?.lastName || "",
      },
    };
    const newToken = await dispatch(fetchSignUp(user));
    if (newToken.meta.requestStatus !== "rejected") {
      window.localStorage.setItem("token", newToken.payload);
      navigate("/products");
    }
  };
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
