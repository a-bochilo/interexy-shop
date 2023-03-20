// ========================== react ==========================
import React, { FC } from "react";

// ========================== mui ==========================
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const PageHeaderComp: FC = () => {
  return (
    <Box component={"header"}>
      <AppBar position="static">
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              BEST STORE LOGO
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default PageHeaderComp;
