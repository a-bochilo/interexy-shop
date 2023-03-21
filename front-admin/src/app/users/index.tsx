// ======== react ============
import React, { FC } from "react";

// ========================== mui ==========================
import { Grid } from "@mui/material";
import Container from "@mui/material/Container";

// ======== components ============
import PageHeaderComp from "../../components/page-header.comp";
import UsersRoutes from "./users.routes";

// ======== routes ============

const LoginPage: FC = () => {
  return (
    <Grid>
      <PageHeaderComp />
      <Container maxWidth="sm" sx={{ p: 10 }}>
        <UsersRoutes />
      </Container>
    </Grid>
  );
};

export default LoginPage;
