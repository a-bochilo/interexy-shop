// ============================ mui ============================
import { Grid, styled } from "@mui/material";

// ======================== components =========================
import PageFooterComp from "../../components/page-footer.comp";

// ========================== routes ===========================
import PageNavBarComp from "../../components/navbar.comp";
import OrdersRoutes from "./orders.routes";

// ========================== styles ===========================
const MainGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  padding-top: 64px;
  min-height: 100vh;
  justify-content: space-between;
`;

const ContentGrid = styled(Grid)`
  display: flex;
  flex-grow: 1;
  min-width: 100%;
`;

const OrdersPage = () => {
  return (
    <MainGrid>
      <PageNavBarComp />
      <ContentGrid>
        <OrdersRoutes />
      </ContentGrid>
      <PageFooterComp />
    </MainGrid>
  );
};

export default OrdersPage;
