// ========================== react ==========================
import { FC } from "react";

// ========================== components ==========================
import SignUpForm from "../../components/signUp-form.component";

// ========================== mui ==========================
import Box from "@mui/material/Box";

const SignUpPage: FC = () => {
  return (
    <Box>
      <SignUpForm/>
    </Box>
  );
};

export default SignUpPage;