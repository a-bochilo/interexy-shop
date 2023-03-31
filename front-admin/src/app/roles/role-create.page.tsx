// ========================== react ==========================
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// ============================ mui ============================
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

// ======================== components =========================
import CreateRoleForm from "../../components/role-create.component";

// =========================== store ===========================
import { fetchRoleCreate } from "./store/roles.actions";
import { AppDispatch } from "../../store";
import { clearErrors, clearRole } from "./store/roles.slice";
import { getErrorSelector, getPendingSelector } from "./store/roles.selector";

// ====================== interfaces & dto's ==================
import { CreateRoleDto } from "./types/create-role.dto";

// =========================== styles ===========================
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
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const fetchingErrors = useSelector(getErrorSelector);
  const fetchingPending = useSelector(getPendingSelector);

  const handleCreate = (data: CreateRoleDto) => {
    if (data.permissions !== null) {
      setIsClicked(true);
      dispatch(fetchRoleCreate(data));
      dispatch(clearRole());
      dispatch(clearErrors());
    }
  };

  const handleBack = () => {
    dispatch(clearRole());
    dispatch(clearErrors());
    navigate(-1);
  };
 
  return (
    <MainGrid>
      <CreateRoleForm
        handleCreate={handleCreate}
        handleBack={handleBack}
        isClicked={isClicked}
        fetchErrors={fetchingErrors.chosenRole}
        fetchingPending={fetchingPending.chosenRole}
      />
    </MainGrid>
  );
};
export default RoleViewPage;
