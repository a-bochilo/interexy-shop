// ======== react ============
import { FC } from "react";

// ========================== mui ==========================
import { Grid } from "@mui/material";
import Container from "@mui/material/Container";

// ======== components ============
import PageHeaderComp from "../../components/page-header.comp";

// ======== routes ============
import LoginRoutes from "./login.routes";

const LoginPage: FC = () => {
  return (
    <Grid>
      <PageHeaderComp />
      <Container maxWidth="sm" sx={{ p: 10 }}>
        <LoginRoutes />
      </Container>
    </Grid>
  );
};

export default LoginPage;
