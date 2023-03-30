/* eslint-disable react-hooks/exhaustive-deps */
// ========================== react ==========================
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// ============================ MUI ============================
import styled from "@emotion/styled";
import { CircularProgress, Grid } from "@mui/material";

// =========================== Store ===========================
import { fetchRoles } from "./store/roles.actions";
import { RolesSelector, getPendingSelector } from "./store/roles.selector";
import { AppDispatch } from "../../store";

// ======================== Components =========================
import RolesTable from "../../components/roles-table.component";
import { clearErrors, clearRole } from "./store/roles.slice";

const MainGrid = styled(Grid)`
  display: flex;
  align-items: top;
  justify-content: space-around;
  width: 100%;
  min-height: 100%;
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
        <CircularProgress data-testid="pending-stub" sx={{ alignSelf: "center" }} />
      )}
      {!!roles?.length && !pending?.roles && <RolesTable roles={roles} />}
    </MainGrid>
  );
};

export default RolesListPage;
