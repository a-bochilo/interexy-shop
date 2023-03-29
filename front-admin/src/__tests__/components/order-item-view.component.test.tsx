/* eslint-disable testing-library/no-unnecessary-act */
import { BrowserRouter } from "react-router-dom";
import OrderItemsViewTable from "../../components/order-items-view-form.component";
import { orderItem } from "../mocks/data.mocks";
import { render, screen, fireEvent, act } from "@testing-library/react";

describe("Order table", () => {
  const mockedUsedNavigate = jest.fn();

  jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate,
  }));

  it("should render component with order items", () => {
    render(
      <BrowserRouter>
        <OrderItemsViewTable orderItems={[orderItem]} />
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
        <OrderItemsViewTable orderItems={[orderItem]} />
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
