// ========================== react ==========================
import { FC, useEffect } from "react";
import RoleForm from "../../components/roles-form.comp";
import { useDispatch, useSelector } from "react-redux";
import { ChosenRoleSelector } from "./store/roles.selector";
import { fetchCurrentRole } from "./store/roles.actions";
import { AppDispatch } from "../../store";
import { useParams } from "react-router-dom";

const RoleViewPage: FC<string> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const role = useSelector(ChosenRoleSelector);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    console.log(id);
    dispatch(fetchCurrentRole(id));
  }, []);

  console.log(role);
  return <div>{role && <RoleForm role={role} />}</div>;
};

export default RoleViewPage;
