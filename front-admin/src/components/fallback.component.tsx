
// ========================== mui ==============================
import { Box, CircularProgress } from "@mui/material";

const FallbackComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        minWidth: "100vw",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default FallbackComponent;
