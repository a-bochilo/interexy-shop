// ========================== react ==========================
import { FC } from "react";

// ========================== components ==========================
import SignUpForm from "../../components/signUp-form.component";

// ========================== mui ==========================
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IFormInput } from "./types/form-input.interface";
import { fetchSignUp } from "./store/auth.actions";
import { ISignUpTemplate } from "./types/signUp.interface";
import { AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { AuthErrorSelector, AuthPendingSelector } from "./store/auth.selector";

const SignUpPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fetchingErrors = useSelector(AuthErrorSelector);
  const fetchingPending = useSelector(AuthPendingSelector);
  const navigate = useNavigate();

  const handleSignUp = (data: IFormInput) => {
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
    dispatch(fetchSignUp(user));
    // navigate('/')
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
        fetchingErrors={fetchingErrors}
        fetchingPending={fetchingPending}
      />
    </Grid>
  );
};

export default SignUpPage;
