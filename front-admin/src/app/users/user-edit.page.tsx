// ========================== react ==========================
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// ========================== mui ==========================
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

// ========================== components ==========================
import FormEditableComp from "../../components/form-editable.comp";

// ========================== store ==========================
import { AppDispatch } from "../../store";
import { userSelector, usersSelector } from "./store/users.selectors";
import { getUserInfo, getUsers } from "./store/users.actions";

const MainGrid = styled(Grid)`
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const UserEditPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedUser = useSelector(userSelector);
  const { userId } = useParams<string>();

  useEffect(() => {
    if (!userId) return;
    dispatch(getUserInfo(userId));
  }, [userId]);

  useEffect(() => {
    dispatch(getUsers);
  });

  return (
    <MainGrid>
      {selectedUser ? (
        <FormEditableComp formName={"Edit user"} />
      ) : (
        "no user selected"
      )}
    </MainGrid>
  );
};

export default UserEditPage;
