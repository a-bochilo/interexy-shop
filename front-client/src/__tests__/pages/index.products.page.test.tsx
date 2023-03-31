// =========================== component ===============================
import ProductsPage from "../../app/products";

// =========================== router ===================================
import { BrowserRouter } from "react-router-dom";

// =========================== axios ===================================
import axios from "axios";

// =========================== store ===================================
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

// =========================== react-testing ===========================
import { render } from "@testing-library/react";

// =========================== mocks ===================================
import {
  initialStateWithCart,
  mockProductDetails,
} from "../mocks/products.data.mocks";
import { mockCart } from "../mocks/cart.data.mocks";

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
mockedAxios.get.mockResolvedValue({ data: mockCart });

// =========================== mock useNavi ============================
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

// =========================== mock store ==============================
const mockStore = configureStore([thunk]);

describe("Index page for products", () => {
  let store: any;
  it("should be rendered", () => {
    store = mockStore(initialStateWithCart);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductsPage />
        </BrowserRouter>
      </Provider>
    );
  });

  it("should be rendered with products", () => {
    store = mockStore({
      products: {
        products: [],
        filtredProducts: [],
        productDetails: mockProductDetails,
        pending: {
          products: false,
          productDetails: false,
          filter: false,
        },
        errors: {
          products: null,
          productDetails: null,
          filter: null,
        },
      },
      cart: {
        cart: null,
        pending: {
          cart: false,
        },
        errors: {
          cart: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductsPage />
        </BrowserRouter>
      </Provider>
    );
  });
});
