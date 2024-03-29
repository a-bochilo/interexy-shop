/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */

// =========================== react ===========================
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import axios from "axios";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

// =========================== mocks ===================================
import { mockOrderItems, order } from "../mocks/order.data.mock";

// =========================== component ===============================
import OrderItemsViewPage from "../../app/orders/orders-view.page";

// =========================== mock useNavigate ============================
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
  useParams: () => ({ orderId: "f825e7b4-be23-41b1-914c-36a8a13ab3c6" }),
}));

// =========================== mock axios ==============================
jest.mock("axios", () => ({
  post: jest.fn(),
  get: jest.fn(),
  create: () => {
    return {
      interceptors: {
        request: { eject: jest.fn(), use: jest.fn() },
        response: { eject: jest.fn(), use: jest.fn() },
      },
    };
  },
}));
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.get.mockResolvedValue({ data: mockOrderItems });

// =========================== mock store ==============================
const mockStore = configureStore([thunk]);

describe("Order view page", () => {
  let store: any;
  it("should be correct rendered", async () => {
    store = mockStore({
      orders: {
        orders: [order],
        orderItems: mockOrderItems,
        pending: {
          orders: false,
          orderItems: false,
        },
        errors: {
          orders: null,
          orderItems: null,
        },
      },
    });
    render(
      <Provider store={store}>
        <OrderItemsViewPage />
      </Provider>
    );
  });

  it("renders CircularProgress when roles are pending", async () => {
    store = mockStore({
      orders: {
        orders: [order],
        orderItems: mockOrderItems,
        pending: {
          orders: true,
          orderItems: true,
        },
        errors: {
          orders: null,
          orderItems: null,
        },
      },
    });
    render(
      <Provider store={store}>
        <OrderItemsViewPage />
      </Provider>
    );
    await screen.findByTestId(/pending-stub/i);
  });
});
