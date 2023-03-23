// ========================== react ==========================
import React, { FC } from "react";

// ========================== mui ==========================
import Box from "@mui/material/Box";

const PageAsideComp = (props: { children: JSX.Element }) => {
    return (
        <Box
            component={"aside"}
            sx={{
                width: 300,
                minHeight: "100%",
                flexGrow: 1,
                backgroundColor: "secondary.main",
                p: 2,
            }}
        >
            {props.children}
        </Box>
    );
};

export default PageAsideComp;
