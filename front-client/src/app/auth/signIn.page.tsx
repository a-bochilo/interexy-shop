// ========================== react ==========================
import { FC, useState } from "react";

// ========================== components ==========================
import SignInForm from "../../components/signIn-form.component";

// ========================== mui ==========================
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { decodeToken } from "react-jwt";
import { fetchSignIn } from "./store/auth.actions";
import { useNavigate } from "react-router-dom";
import { fetchCart } from "../cart/store/cart.actions";
import { useTranslation } from "react-i18next";
import { IAuthTranslate } from "./types/auth-translate.interface";

interface IFormInput {
  email: string;
  password: string;
}

const SignInPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  const authWithTranslate: IAuthTranslate = t("auth", {
    returnObjects: true,
  });

  const handleSignIn = async (data: IFormInput) => {
    const newToken = await dispatch(fetchSignIn(data));
    if (!newToken.payload) {
      //ERROR: FAILED TO SIGNIN
      setError(true);
    }
    if (newToken.payload) {
      const user: any = decodeToken(newToken.payload);
      if (user.role_type === "superadmin") {
        window.location.replace("http://localhost:3000");
        setError(false);
      } else {
        window.localStorage.setItem("token", newToken.payload);
        dispatch(fetchCart());
        navigate("/products");
        setError(false);
      }
    }
  };

  const handleRedirectToSignUp = () => {
    navigate("/auth/signUp");
  };

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
        error={error}
        authWithTranslate={authWithTranslate}
        handleRedirectToSignUp={handleRedirectToSignUp}
      />
    </Grid>
  );
};

export default SignInPage;
