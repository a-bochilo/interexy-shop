// ========================== react ==========================
import React, { FC } from "react";

// ========================== mui ==========================
import Box from "@mui/material/Box";

const PageAsideComp: FC = () => {
  return (
    <Box
      component={"aside"}
      sx={{
        width: 300,
        minHeight: { xs: 295, md: 695 },
        backgroundColor: "secondary.main",
      }}
    />
  );
};

export default PageAsideComp;
