// ========================== react ==========================
import { FC } from "react";

// ========================== mui ==========================
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const PageFooterComp: FC = () => {
  return (
    <Box component={"footer"}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              fontFamily: "monospace",
              fontWeight: "bold",
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            © 2023 BEST STORE EVER
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default PageFooterComp;
