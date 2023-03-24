// ========================== react ==========================
import { FC } from "react";
import { useDispatch } from "react-redux";
import {
  fetchRoleCreate,
} from "./store/roles.actions";
import { AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { RolesDto } from "./types/roles.dto";
import CreateRoleForm from "../../components/role-create.comp";

const MainGrid = styled(Grid)`
  display: flex;
  align-items: top;
  justify-content: space-around;
  width: 100%;
  min-height: 100%;
`;

const RoleViewPage: FC<string> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleCreate = (data: RolesDto) => {
    console.log(data);
    dispatch(fetchRoleCreate(data));
  };

  const handleBack = () => {
    navigate("/roles");
  };
  
  return (
    <MainGrid>
      <CreateRoleForm
        handleCreate={handleCreate}
        handleBack={handleBack}
      />
    </MainGrid>
  );
};
export default RoleViewPage;
