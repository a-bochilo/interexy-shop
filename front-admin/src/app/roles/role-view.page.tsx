// ========================== react ==========================
import { FC, useEffect, useState } from "react";
import RoleForm from "../../components/roles-form.comp";
import { useDispatch, useSelector } from "react-redux";
import {
  ChosenRoleSelector,
  getErrorSelector,
  getPendingSelector,
} from "./store/roles.selector";
import {
  fetchCurrentRole,
  fetchRoleDelete,
  fetchRoleUpdate,
} from "./store/roles.actions";
import { AppDispatch } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { RolesDto } from "./types/roles.dto";
import { clearErrors, clearRole } from "./store/roles.slice";

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
  const pending = useSelector(getPendingSelector);
  const errors = useSelector(getErrorSelector);

  const { id } = useParams();

  const [isEditable, setIsEditable] = useState<boolean>(true);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleBack = () => {
    dispatch(clearErrors());
    dispatch(clearRole());
    navigate("/roles");
  };

  const handleDelete = (id: number) => {
    dispatch(fetchRoleDelete(id));
    dispatch(clearErrors());
    dispatch(clearRole());
    navigate("/roles");
    setIsClicked(true);
  };

  const handleSave = (data: RolesDto) => {
    dispatch(fetchRoleUpdate(data));
    dispatch(clearErrors());
    dispatch(clearRole());
    navigate("/roles");
    setIsClicked(true);
  };

  useEffect(() => {
    if (!id) return;
    dispatch(fetchCurrentRole(id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <MainGrid>
      {role && (
        <RoleForm
          role={role}
          isClicked={isClicked}
          isEditable={isEditable}
          pending={pending}
          fetchingErrors={errors}
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
