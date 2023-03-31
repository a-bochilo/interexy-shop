// ========================== react ==========================
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import axios from "axios";

// ========================== redux ==========================
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

// ========================== components ==========================
import OrdersListPage from "../../app/orders/orders-list.page";

// ========================== mock ==========================
import { initialState, order } from "../mocks/order.data.mock";

// ========================== mock useNavigate ==========================
const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUseNavigate,
}));

// ========================== mock axios ==========================
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
mockedAxios.post.mockResolvedValue({ data: [order] });
mockedAxios.get.mockResolvedValue({ data: [order] });

// ====================== mock store ======================
const mockStore = configureStore([thunk]);

describe("Order list page", () => {
  let store: any;

  it("should render component", () => {
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <OrdersListPage/>
      </Provider>
    );
  });
});
