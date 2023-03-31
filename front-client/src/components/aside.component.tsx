// ========================== mui ==========================
import Box from "@mui/material/Box";

const PageAsideComp = (props: {
  children: JSX.Element | (JSX.Element | null)[];
}) => {
  return (
    <Box
      component={"aside"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: { xs: "100%", md: 300 },
        width: { xs: "100%", md: 300 },
        minHeight: { xs: null, md: "100%" },
        flexGrow: { xs: null, md: 1 },
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
