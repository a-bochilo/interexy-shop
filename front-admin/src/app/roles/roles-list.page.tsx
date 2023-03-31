/* eslint-disable react-hooks/exhaustive-deps */
// ========================== react ==========================
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// ============================ mui ============================
import styled from "@emotion/styled";
import { CircularProgress, Grid } from "@mui/material";

// =========================== store ===========================
import { fetchRoles } from "./store/roles.actions";
import { RolesSelector, getPendingSelector } from "./store/roles.selector";
import { AppDispatch } from "../../store";
import { clearErrors } from "./store/roles.slice";

// ======================== components =========================
import RolesTable from "../../components/roles-table.component";

const MainGrid = styled(Grid)`
  display: flex;
  align-items: top;
  justify-content: space-around;
  width: 100%;
  min-height: 100vh;
`;

const RolesListPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const roles = useSelector(RolesSelector);
  const pending = useSelector(getPendingSelector);

  useEffect(() => {
    dispatch(clearErrors());
    dispatch(fetchRoles());
  }, []);

  return (
    <MainGrid>
      {pending?.roles && (
        <CircularProgress
          data-testid="pending-stub"
          sx={{ alignSelf: "center" }}
        />
      )}
      {!!roles?.length && !pending?.roles && <RolesTable roles={roles} />}
    </MainGrid>
  );
};

export default RolesListPage;
