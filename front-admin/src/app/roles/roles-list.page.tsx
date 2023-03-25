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
import { clearRole } from "./store/roles.slice";

// ======================== Components =========================
import RolesTable from "../../components/roles-table.component";

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
    dispatch(clearRole());
    dispatch(fetchRoles());
  }, []);

  return (
    <MainGrid>
      {pending.roles && <CircularProgress sx={{ alignSelf: "center" }} />}
      {!!roles.length && !pending.roles && <RolesTable roles={roles} />}
    </MainGrid>
  );
};

export default RolesListPage;
