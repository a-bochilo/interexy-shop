// ========================== react ==========================
import React, { FC } from "react";

// ========================== mui ==========================
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

const PageAsideComp: FC = () => {
  return (
    <>
      <Box
        component={"aside"}
        sx={{
          width: 300,
          backgroundColor: "secondary.main",
        }}
      >
        <Button
          sx={{
            width: "100%",
            marginTop: "4px"
          }}
          variant="contained"
          color="success"
        >
          CREATE NEW ROLE
        </Button>
      </Box>
    </>
  );
};

export default PageAsideComp;
