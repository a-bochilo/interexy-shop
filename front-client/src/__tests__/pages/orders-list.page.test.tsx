// =========================== axios ===================================
import axios from "axios";

// =========================== store ===================================
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

// =========================== react-testing ===========================
import { render, screen } from "@testing-library/react";

// =========================== mocks ===================================
import { mockOrderItems, order } from "../mocks/order.data.mock";

// =========================== component ===============================
import OrdersListPage from "../../app/orders/orders-list.page";

// =========================== mock i18n ==============================
jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

// =========================== mock useNavi ============================
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
        <OrdersListPage />
      </Provider>
    );
  });

  it("should be correct rendered without orders and with attention", async () => {
    store = mockStore({
      orders: {
        orders: [],
        orderItems: null,
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
        <OrdersListPage />
      </Provider>
    );
    expect(screen.getByTestId(/empty-stub/i)).toBeInTheDocument();
  });
});
