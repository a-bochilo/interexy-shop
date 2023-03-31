// ========================== react ============================
import { FC } from "react";

// ========================== mui ==============================
import { Grid, styled } from "@mui/material";

// ========================== routes ===========================
import AuthRoutes from "./auth.routes";
import PageFooterComp from "../../components/page-footer.comp";
import PageNavBarComp from "../../components/navbar.comp";

// ========================== styles ===========================
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
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  min-width: 100%;
  min-height: 100%;
`;

const AuthPage: FC = () => {
  return (
    <MainGrid>
      <PageNavBarComp />
      <ContentGrid sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}>
        <AuthRoutes />
      </ContentGrid>
      <PageFooterComp />
    </MainGrid>
  );
};

export default AuthPage;
