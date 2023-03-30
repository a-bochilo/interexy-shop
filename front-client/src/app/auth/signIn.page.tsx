// ========================== react ==========================
import { FC } from "react";
import { FC } from "react";

// ========================== components ==========================
import SignInForm from "../../components/signIn-form.component";

// ========================== mui ==========================
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { decodeToken } from "react-jwt";
import { fetchSignIn } from "./store/auth.actions";
import { useNavigate } from "react-router-dom";
import { fetchCart } from "../cart/store/cart.actions";
import { useTranslation } from "react-i18next";
import { IAuthTranslate } from "./types/auth-translate.interface";
import { AuthErrorSelector } from "./store/auth.selector";
import { clearErrors } from "./store/auth.slice";
import { useTranslation } from "react-i18next";
import { IAuthTranslate } from "./types/auth-translate.interface";
import { AuthErrorSelector } from "./store/auth.selector";
import { clearErrors } from "./store/auth.slice";

interface IFormInput {
  email: string;
  password: string;
  email: string;
  password: string;
}

export const handleResponse = (response: any, navigate: (path: string) => void) => {
  if (response.payload) {
    const user: any = decodeToken(response.payload);
    if (user.role_type === "superadmin") {
      window.location.replace("http://localhost:3000");
      return false;
    } else {
      window.localStorage.setItem("token", response.payload);
      navigate("/products");
      return true;
    }
  }
};

const SignInPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { t } = useTranslation();

  const fecthErrors = useSelector(AuthErrorSelector);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { t } = useTranslation();

  const fecthErrors = useSelector(AuthErrorSelector);

  const handleSignIn = async (data: IFormInput) => {
    const newToken = await dispatch(fetchSignIn(data));
    handleResponse(newToken, navigate);
    dispatch(fetchCart());
  };

  const handleRedirectToSignUp = () => {
    dispatch(clearErrors());
    navigate("/auth/signUp");
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
        minHeight: "100%",
      }}
    >
      <SignInForm
        handleSignIn={handleSignIn}
        fecthErrors={fecthErrors.token || null}
        authWithTranslate={authWithTranslate}
        handleRedirectToSignUp={handleRedirectToSignUp}
      />
    </Grid>
  );
};

export default SignInPage;
