// ========================== react ==========================
import { FC } from "react";

// ========================== components ==========================
import LoginForm from "../../components/login-form.comp";

// ========================== mui ==========================
import Box from "@mui/material/Box";

const LoginPage: FC = () => {
  return (
    <Box>
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
