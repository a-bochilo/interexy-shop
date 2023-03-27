// ========================== mui ==========================
import Box from "@mui/material/Box";

const PageAsideComp = (props: { children: JSX.Element | JSX.Element[] }) => {
    return (
        <Box
            component={"aside"}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 300,
                minHeight: "100%",
                flexGrow: 1,
                backgroundColor: "secondary.main",
                p: 2,
                gap: 1,
            }}
        >
            {props.children}
        </Box>
    );
};

export default PageAsideComp;
