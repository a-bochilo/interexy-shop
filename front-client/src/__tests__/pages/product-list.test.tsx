/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */
import { Provider } from "react-redux";
import thunk from "redux-thunk";

// =========================== Libs ===========================
import _ from "lodash";

// =========================== React-testing ===========================
import { act, fireEvent, render, screen } from "@testing-library/react";

// =========================== Mocks ===========================
import configureStore from "redux-mock-store";
import { initialStateWithCart } from "../mocks/products.data.mocks";

// =========================== Component ===========================
import ProductListPage from "../../app/products/product-list.page";

// =========================== Mock Lodash ===========================
jest.unmock("lodash");
_.debounce = (fn: any, t: any) => fn();

// ====================== Mock useNavi ======================
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

// =========================== Mock Dispatch ===========================
const mockedDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockedDispatch,
}));

// =========================== Mock Store ===========================
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
