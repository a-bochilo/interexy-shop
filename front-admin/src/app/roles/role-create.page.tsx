// ========================== react ==========================
import { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// ============================ MUI ============================
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

// ======================== Components =========================
import CreateRoleForm from "../../components/role-create.component";

// =========================== Store ===========================
import { fetchRoleCreate } from "./store/roles.actions";
import { AppDispatch } from "../../store";

// ====================== Interfaces & DTO's ==================
import { RolesDto } from "./types/roles.dto";

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
    dispatch(fetchRoleCreate(data));
    navigate("/roles");
  };

  const handleBack = () => {
    navigate("/roles");
  };

  return (
    <MainGrid>
      <CreateRoleForm handleCreate={handleCreate} handleBack={handleBack} />
    </MainGrid>
  );
};
export default RoleViewPage;
