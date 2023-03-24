// ========================== react ==========================
import { FC, useEffect, useState } from "react";
import RoleForm from "../../components/roles-form.comp";
import { useDispatch, useSelector } from "react-redux";
import { ChosenRoleSelector } from "./store/roles.selector";
import { fetchCurrentRole, fetchRoleDelete, fetchRoleUpdate } from "./store/roles.actions";
import { AppDispatch } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
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
  const role = useSelector(ChosenRoleSelector);
  // const pending = useSelector(getPendingSelector);
  const { id } = useParams();

  const [isEditable, setIsEditable] = useState(true);

  const handleBack = () => {
    navigate("/roles");
  };

  const handleDelete = (id: number) => {
    dispatch(fetchRoleDelete(id))
    navigate('/roles');
  };

  const handleSave = (data: RolesDto) => {
    console.log(data)
    dispatch(fetchRoleUpdate(data))
  }

  useEffect(() => {
    if (!id) return;
    dispatch(fetchCurrentRole(id));
  }, [dispatch, id]);

  return (
    <MainGrid>
      {role && (
        <RoleForm
          role={role}
          isEditable={isEditable}
          setIsEditable={setIsEditable}
          handleBack={handleBack}
          handleDelete={handleDelete}
          handleSave={handleSave}
        />
      )}
    </MainGrid>
  );
};

export default RoleViewPage;
