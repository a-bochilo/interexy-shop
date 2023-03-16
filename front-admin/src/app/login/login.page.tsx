// ========================== react ==========================
import { FC } from "react";

// ========================== components ==========================
import LoginForm from "../../components/login-form.comp";

// ========================== mui ==========================
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

const MainGrid = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
`;

const LoginPage: FC = () => {
  return (
    <MainGrid>
      <LoginForm />
    </MainGrid>
  );
};

export default LoginPage;
