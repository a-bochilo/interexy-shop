/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */
// =========================== lodash ===========================
import _ from "lodash";

// =========================== react ===========================
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { act, fireEvent, render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";

// =========================== mocks ===========================
import { initialStateWithCart } from "../mocks/products.data.mocks";

// =========================== component ===========================
import ProductListPage from "../../app/products/product-list.page";

// =========================== mock lodash ===========================
jest.unmock("lodash");
_.debounce = (fn: any, t: any) => fn();

// ====================== mock useNavigate ======================
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

// =========================== mock dispatch ===========================
const mockedDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockedDispatch,
}));

// =========================== mock store ===========================
const mockStore = configureStore([thunk]);

describe("ProductList page", () => {
  let store: any;

  it("should render component", () => {
    store = mockStore(initialStateWithCart);

    render(
      <Provider store={store}>
        <ProductListPage />
      </Provider>
    );
  });

  it("should render CircularProgress component in case of pending", async () => {
    store = mockStore({
      ...initialStateWithCart,
      products: {
        ...initialStateWithCart.products,
        pending: {
          ...initialStateWithCart.products.pending,
          products: true,
        },
      },
    });

    render(
      <Provider store={store}>
        <ProductListPage />
      </Provider>
    );

    await screen.findByTestId(/pending-stub/i);
  });

  it("should render empty grid in case of there is no filtred products", async () => {
    store = mockStore({
      ...initialStateWithCart,
      products: {
        ...initialStateWithCart.products,
        filtredProducts: [],
      },
    });

    render(
      <Provider store={store}>
        <ProductListPage />
      </Provider>
    );

    expect(screen.getByTestId(/maingrid-test/i)).toBeEmptyDOMElement();
  });

  it("should call mockedUsedNavigate name clicked", async () => {
    store = mockStore(initialStateWithCart);

    render(
      <Provider store={store}>
        <ProductListPage />
      </Provider>
    );

    const name = screen.getByTestId("card-name-typograhy-test");

    await act(() => fireEvent.click(name));

    expect(mockedUsedNavigate).toBeCalledTimes(1);
  });

  it("should send err message to nested component", async () => {
    store = mockStore({
      ...initialStateWithCart,
      cart: {
        ...initialStateWithCart.cart,
        errors: {
          cart: "testError",
        },
      },
    });

    render(
      <Provider store={store}>
        <ProductListPage />
      </Provider>
    );

    expect(screen.getByText("testError")).toBeInTheDocument();
  });
});
