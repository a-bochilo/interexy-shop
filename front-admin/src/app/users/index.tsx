// ======== react ============
import React, { FC } from "react";

// ========================== mui ==========================
import { Grid } from "@mui/material";
import styled from "@emotion/styled";

// ======== components ============
import UsersRoutes from "./users.routes";
import PageNavBarComp from "../../components/navbar.comp";

// ======== routes ============

const MainGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  min-height: 100vh;
  padding-top: 64px;
  justify-content: space-between;
`;

const ContentGrid = styled(Grid)`
  display: flex;
  flex-grow: 1;
  min-width: 100%;
  min-height: 100%;
`;

const LoginPage: FC = () => {
  return (
    <MainGrid>
      <PageNavBarComp/>
      <ContentGrid>
        <UsersRoutes />
      </ContentGrid>
    </MainGrid>
  );
};

export default LoginPage;
