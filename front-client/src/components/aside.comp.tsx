// ========================== react ==========================
import React, { FC } from "react";

// ========================== mui ==========================
import Box from "@mui/material/Box";

const PageAsideComp: FC = () => {
  return (
    <aside>
      <Box
        sx={{
          width: 300,
          height: 600,
          backgroundColor: "yellow",
          "&:hover": {
            backgroundColor: "lightyellow",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      />
    </aside>
  );
};

export default PageAsideComp;
