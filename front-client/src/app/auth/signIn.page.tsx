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

interface IFormInput {
  email: string;
  password: string;
}

const SignInPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleSignIn = async (data: IFormInput) => {
    const newToken = await dispatch(fetchSignIn(data));
    if (!newToken.payload) {
      //ERROR: FAILED TO SIGNIN
      setError(true);
    }
    if (newToken.payload) {
      const user: any = decodeToken(newToken.payload);
      if (user.role_type === "superadmin") {
        window.localStorage.setItem("token", newToken.payload);
        window.location.replace("https:localhost:3000/");
        setError(false);
      } else {
        window.localStorage.setItem("token", newToken.payload);
        navigate("/roles");
        setError(false);
      }
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
      <SignInForm handleSignIn={handleSignIn} error={error} />
    </Grid>
  );
};

export default SignInPage;
