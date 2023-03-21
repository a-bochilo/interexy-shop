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

const UserListPage: FC = () => {
  return <MainGrid>User List Is Here</MainGrid>;
};

export default UserListPage;
