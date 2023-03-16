// ======== react ============
import React, { FC } from "react";

// ========================== mui ==========================
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

// ======== components ============
import PageHeaderComp from "../../components/page-header.comp";

// ======== routes ============
import LoginRoutes from "./login.routes";

const MainGrid = styled(Grid)`
  flex: 1 1 0;
`;

const LoginPage: FC = () => {
  return (
    <MainGrid>
      <PageHeaderComp />
      <LoginRoutes />
    </MainGrid>
  );
};

export default LoginPage;
