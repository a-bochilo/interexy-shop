// ======== react ============
import { FC } from "react";

// ========================== mui ==========================
import { Grid } from "@mui/material";
import Container from "@mui/material/Container";

// ======== routes ============
import LoginRoutes from "./login.routes";

// ========================== component ==========================
import PageNavBarComp from "../../components/navbar.comp";

const LoginPage: FC = () => {
  return (
    <Grid>
      <PageNavBarComp />
      <Container maxWidth="sm" sx={{ p: 10 }}>
        <LoginRoutes />
      </Container>
    </Grid>
  );
};

export default LoginPage;
