import { render } from "@testing-library/react";
import ProductsPage from "../../app/products";
import { Provider } from "react-redux";
import axios from "axios";
import { mockCart } from "../mocks/cart.data.mocks";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { initialStateWithCart, mockProduct, mockProductDetails, nonEmptyCart } from "../mocks/products.data.mocks";

// =========================== Mock Axios ==============================
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

// =========================== Mock useNavi ============================
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

// =========================== Mock Store ==============================
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
