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
        height: 700,
        backgroundColor: "primary.dark",
        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    />
  );
};

export default PageAsideComp;
