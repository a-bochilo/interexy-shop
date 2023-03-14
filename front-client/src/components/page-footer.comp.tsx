// ========================== react ==========================
import React, { FC } from "react";

// ========================== mui ==========================
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const PageFooterComp: FC = () => {
  return (
    <footer>
      {" "}
      <React.Fragment>
        <AppBar
          position="fixed"
          color="primary"
          sx={{ top: "auto", bottom: 0 }}
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              © 2023 BEST STORE EVER
            </Typography>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </footer>
  );
};

export default PageFooterComp;
