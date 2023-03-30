// ========================== React ===========================
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

// ========================== Routes ==========================
import RolesRoutes from "./roles.routes";

// ============================ MUI ============================
import { Button, Grid, styled } from "@mui/material";

// ======================== Components =========================
import PageAsideComp from "../../components/aside.comp";
import PageFooterComp from "../../components/page-footer.comp";
import PageNavBarComp from "../../components/navbar.comp";

const MainGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  padding-top: 64px;
  min-height: 100vh;
  justify-content: space-between;
`;

const ContentGrid = styled(Grid)`
  display: flex;
  flex-grow: 1;
  min-width: 100%;
`;

const RolesPage: FC = () => {
  const navigate = useNavigate();
  return (
    <MainGrid>
      <PageNavBarComp />
      <ContentGrid>
        <RolesRoutes />
        <PageAsideComp>
          <Button
            sx={{
              width: "100%",
            }}
            type="submit"
            variant="contained"
            color="success"
            onClick={() => navigate("create")}
          >
            CREATE ROLE
          </Button>
        </PageAsideComp>
      </ContentGrid>
      <PageFooterComp />
    </MainGrid>
  );
};

export default RolesPage;
