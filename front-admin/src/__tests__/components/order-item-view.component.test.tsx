/* eslint-disable testing-library/no-unnecessary-act */
import { BrowserRouter } from "react-router-dom";

// =========================== React-testing ===========================
import { render, screen, fireEvent, act } from "@testing-library/react";

// =========================== Mocks ===================================
import { mockOrderItems } from "../mocks/order.data.mock";

// =========================== Component ===============================
import OrderItemsViewTable from "../../components/order-items-view-form.component";

describe("Order table", () => {
  const mockedUsedNavigate = jest.fn();

  jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate,
  }));

  it("should render component with order items", () => {
    render(
      <BrowserRouter>
        <OrderItemsViewTable orderItems={mockOrderItems} />
      </BrowserRouter>
    );
  });

  it("should render component without order items", () => {
    render(
      <BrowserRouter>
        <OrderItemsViewTable orderItems={[]} />
      </BrowserRouter>
    );
  });
  it("should render component with navigate button", async () => {
    render(
      <BrowserRouter>
        <OrderItemsViewTable orderItems={mockOrderItems} />
      </BrowserRouter>
    );
    act(() => {
      fireEvent.click(
        screen.getByRole("button", {
          name: /back to orders/i,
        })
      );
    });

    expect(
      screen.getByRole("button", {
        name: /back to orders/i,
      })
    ).toBeInTheDocument();
  });
});
