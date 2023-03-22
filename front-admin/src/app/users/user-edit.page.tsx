// ========================== react ==========================
import { FC } from "react";

// ========================== mui ==========================
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

// ========================== components ==========================
import FormEditableComp from "../../components/form-editable.comp";

const MainGrid = styled(Grid)`
  justify-content: center;
  align-items: center;
`;

const UserEditPage: FC = () => {
  return <MainGrid><FormEditableComp formName={"Edit user"}/></MainGrid>;
};

export default UserEditPage;
