// ========================== react ==========================
import { FC, useEffect } from "react";
import RoleForm from "../../components/roles-form.comp";
import { useDispatch, useSelector } from "react-redux";
import { ChosenRoleSelector } from "./store/roles.selector";
import { fetchCurrentRole } from "./store/roles.actions";
import { AppDispatch } from "../../store";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

const MainGrid = styled(Grid)`
    display: flex;
    align-items: top;
    justify-content: space-around;
    width: 100%;
    min-height: 100%;
`;

const RoleViewPage: FC<string> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const role = useSelector(ChosenRoleSelector);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    dispatch(fetchCurrentRole(id));
  }, [dispatch, id]);

 
  return <MainGrid>{role && <RoleForm role={role}/>}</MainGrid>;
};

export default RoleViewPage;
