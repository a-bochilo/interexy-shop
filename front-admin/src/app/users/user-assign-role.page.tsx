// ========================== react ==========================
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// ========================== mui ==========================
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { CircularProgress } from "@mui/material";

// ========================== components ==========================
import UserAssignRoleFormComp from "../../components/user-assign-role-form.comp";

// ========================== store ==========================
import { AppDispatch } from "../../store";
import {
  userInfoSelector,
  usersSelector,
  usersLoadingSelector,
} from "./store/users.selectors";
import {
  assignRole,
  getUserInfo,
  getUsers,
  updateUserInfo,
} from "./store/users.actions";
import { fetchRoles } from "../roles/store/roles.actions";
import { RolesSelector } from "../roles/store/roles.selector";

interface IUserAssignRole {
  id: string;
  name: string;
}

const MainGrid = styled(Grid)`
  justify-content: center;
  align-items: center;
  padding: 10px;
  display: flex;
  width: 100%;
  min-height: 100%;
`;

const UserAssignRolePage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const userList = useSelector(usersSelector);
  const userRoles = useSelector(RolesSelector);
  const usersLoading = useSelector(usersLoadingSelector);
  const { userId } = useParams<string>();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    dispatch(fetchRoles());
  }, []);

  const buttonOnclick = () => {
    setDisabled(!disabled);
  };

  const handleSave = (data: IUserAssignRole) => {
    if (!userId) return;
    dispatch(assignRole(data));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const selectedUser = userList.find((user) => user.id === userId);
  const selectedUserRole = userRoles.find(
    (role) => role.id === selectedUser?.roleId
  );
  console.log(`selectedUserRole`, selectedUserRole);

  return (
    <MainGrid>
      {selectedUserRole && userId ? (
        <UserAssignRoleFormComp
          formName={"User Assign Role"}
          userRoles={userRoles}
          userId={userId}
          disabled={disabled}
          selectedUserRole={selectedUserRole}
          pending={usersLoading}
          setDisabled={setDisabled}
          buttonOnclick={buttonOnclick}
          handleSave={handleSave}
          handleBack={handleBack}
        />
      ) : (
        <CircularProgress />
      )}
    </MainGrid>
  );
};

export default UserAssignRolePage;
