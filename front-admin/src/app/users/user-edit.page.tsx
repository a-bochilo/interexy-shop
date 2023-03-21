// ========================== react ==========================
import { FC } from "react";

// ========================== mui ==========================
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

const MainGrid = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserEditPage: FC = () => {
  return <MainGrid>Edit User</MainGrid>;
};

export default UserEditPage;
