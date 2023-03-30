/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
// eslint-disable-next-line testing-library/no-unnecessary-act
import { render } from "@testing-library/react";
import OrdersTable from "../../components/orders-table.component";
import { BrowserRouter } from "react-router-dom";
import { order } from "../mocks/order.data.mock";

// =========================== React-testing ===========================
// =========================== Mocks ===================================
// =========================== Component ===============================
// =========================== Mock useNavi ============================
// =========================== Mock Store ==============================

describe("Order table", () => {
  const mockedUsedNavigate = jest.fn();

  jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate,
  }));

  it("should render component", () => {
    render(
      <BrowserRouter>
        <OrdersTable orders={[order]} />
      </BrowserRouter>
    );
  });

  it("should render component without orders", () => {
    render(
      <BrowserRouter>
        <OrdersTable orders={[]} />
      </BrowserRouter>
    );
  });
});
