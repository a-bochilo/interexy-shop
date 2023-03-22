// ======== react ============
import React, { FC } from "react";

// ========================== mui ==========================
import { Grid } from "@mui/material";
import Container from "@mui/material/Container";

// ======== components ============
import PageHeaderComp from "../../components/page-header.comp";

// ======== routes ============
import RolesRoutes from "./roles.routes";

const RolesPage: FC = () => {
  return (
    <Grid>
      <PageHeaderComp />
      <Container maxWidth="sm" sx={{ p: 10 }}>
        <RolesRoutes />
      </Container>
    </Grid>
  );
};

export default RolesPage;