// ========================== react ==========================
import { FC } from "react";

// ========================== components ==========================
import SignInForm from "../../components/signIn-form.component";

// ========================== mui ==========================
import Box from "@mui/material/Box";


const SignInPage: FC = () => {
  return (
    <Box>
      <SignInForm/>
    </Box>
  );
};

export default SignInPage;
