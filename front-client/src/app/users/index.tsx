// ======== react ============
import React, { FC } from "react";

// ========================== mui ==========================
import { Grid } from "@mui/material";
import styled from "@emotion/styled";

// ======== components ============
import PageHeaderComp from "../../components/page-header.comp";
import UsersRoutes from "./users.routes";
import PageNavBarComp from "../../components/navbar.comp";
import PageFooterComp from "../../components/page-footer.comp";

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
      <PageNavBarComp />
      <ContentGrid sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}>
        <UsersRoutes />
      </ContentGrid>
      <PageFooterComp />
    </MainGrid>
  );
};

export default LoginPage;
