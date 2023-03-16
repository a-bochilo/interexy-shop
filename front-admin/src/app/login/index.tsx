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

const ContentGrid = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  max-width: 100%;
  max-height: 80%;
`;

const LoginPage: FC = () => {
  return (
    <MainGrid>
      <Grid>
        <PageHeaderComp />
        <ContentGrid>
          <LoginRoutes />
        </ContentGrid>
      </Grid>
    </MainGrid>
  );
};

export default LoginPage;
