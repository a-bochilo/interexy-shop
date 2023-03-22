// ======== react ============
import React, { FC } from "react";

// ========================== mui ==========================
import { Grid, styled } from "@mui/material";

// ======== components ============
import PageHeaderComp from "../../components/page-header.comp";
import PageAsideComp from "../../components/aside.comp";
import PageFooterComp from "../../components/page-footer.comp";

// ======== routes ============
import RolesRoutes from "./roles.routes";

const MainGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  min-height: 100vh;
  justify-content: space-between;
`;

const ContentGrid = styled(Grid)`
  display: flex;
  flex-grow: 1;
  min-width: 100%;
  min-height: 100%;
`;

const RolesPage: FC = () => {
  return (
    <MainGrid>
      <PageHeaderComp />
      <ContentGrid>
        <RolesRoutes />
        <PageAsideComp />
      </ContentGrid>
      <PageFooterComp />
    </MainGrid>
  );
};

export default RolesPage;
