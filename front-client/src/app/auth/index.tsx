// ======== react ============
import { FC } from "react";

// ========================== mui ==========================
import { Grid } from "@mui/material";
import Container from "@mui/material/Container";

// ======== components ============

// ======== routes ============
import AuthRoutes from "./auth.routes";

const AuthPage: FC = () => {
  return (
    <Grid>
      <Container maxWidth="sm" sx={{ p: 10 }}>
        <AuthRoutes />
      </Container>
    </Grid>
  );
};

export default AuthPage;
