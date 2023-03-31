// ========================== react ===============================
import { FC } from "react";
import { useNavigate } from "react-router-dom";

// ========================== react-jwt ===========================
import { decodeToken } from "react-jwt";

// ========================== components ==========================
import SignInForm from "../../components/signIn-form.component";

// ========================== mui ==================================
import { Grid } from "@mui/material";

// ========================== store ================================
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchSignIn } from "./store/auth.actions";
import { fetchCart } from "../cart/store/cart.actions";
import { AuthErrorSelector } from "./store/auth.selector";
import { clearErrors } from "./store/auth.slice";

// ========================== i18n =================================
import { useTranslation } from "react-i18next";

// ========================== interface ============================
import { IAuthTranslate } from "./types/auth-translate.interface";

interface IFormInput {
  email: string;
  password: string;
}

export const handleResponse = (
  response: any,
  navigate: (path: string) => void
) => {
  if (response.payload) {
    const user: any = decodeToken(response.payload);
    if (user.role_type === "superadmin") {
      window.location.replace("http://localhost:8080");
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
        fecthErrors={fecthErrors.token}
        authWithTranslate={authWithTranslate}
        handleRedirectToSignUp={handleRedirectToSignUp}
      />
    </Grid>
  );
};

export default SignInPage;
