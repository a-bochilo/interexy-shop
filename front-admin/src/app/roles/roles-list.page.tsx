// ========================== react ==========================
import { FC, useEffect } from "react";

// ========================== mui ==========================
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import RolesTable from "../../components/roles-table.component";
import { fetchRoles } from "./store/roles.actions";
import { RolesSelector } from "./store/roles.selector";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";

const MainGrid = styled(Grid)`
    display: flex;
    align-items: top;
    justify-content: space-around;
    width: 100%;
    min-height: 100%;
`;

const ProductListPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const roles = useSelector(RolesSelector);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);
  
  return (
    <MainGrid>
      <RolesTable roles={roles} />
    </MainGrid>
  );
};

export default ProductListPage;
