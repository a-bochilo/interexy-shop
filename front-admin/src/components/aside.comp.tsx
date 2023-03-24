// ========================== react ==========================
import React, { FC } from "react";

// ========================== mui ==========================
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PageAsideComp: FC = () => {
  const navigate = useNavigate();
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
            marginTop: "4px",
          }}
          variant="contained"
          color="success"
          onClick={() => navigate("create")}
        >
          CREATE NEW ROLE
        </Button>
      </Box>
    </>
  );
};

export default PageAsideComp;
