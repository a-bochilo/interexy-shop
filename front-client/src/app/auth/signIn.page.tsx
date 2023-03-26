// ========================== react ==========================
import { FC } from "react";

// ========================== components ==========================
import SignInForm from "../../components/signIn-form.component";

// ========================== mui ==========================
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";


const SignInPage: FC = () => {
  return (
    <Grid sx={{
      display: 'flex',
      flexDirection: "column",
      minWidth:"400px"
    }}>
      <SignInForm/>
    </Grid>
  );
};

export default SignInPage;
