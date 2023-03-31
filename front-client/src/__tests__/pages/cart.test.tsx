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
import { initialState, mockCart } from "../mocks/cart.data.mocks";

// =========================== Component ===========================
import CartPage from "../../app/cart";

// =========================== mock lodash ===========================
jest.unmock("lodash");
_.debounce = (fn: any, _: any) => fn;

// ====================== mock useNavigate ======================
const mockedUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUseNavigate,
}));

// =========================== mock i18n ===========================
const tFunc = (key: string) => {
  const obj = {
    pricePerPcs: "price per pcs",
    total: "Total",
    orderAmount: "Order amount",
    confirmOrder: "Confirm order",
    ordering: "Ordering",
    emptyCartStub: "Cart is empty",
  };
  return obj;
};
jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: tFunc,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

// =========================== mock store ===========================
const mockStore = configureStore([thunk]);

// =========================== mock pageNavBar ===========================
jest.mock("../../components/navbar.comp", () => () => {
  return <div></div>;
});

describe("Cart page", () => {
  let store: any;

  it("should render component", () => {
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );
  });

  it("should show 'Cart is empty' text in case there are no items", async () => {
    store = mockStore({
      ...initialState,
      cart: {
        ...initialState.cart,
        cart: {
          ...mockCart,
          items: [],
        },
      },
    });

    render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );

    expect(screen.getByText("Cart is empty")).toBeInTheDocument();
  });

  it("should render CircularProgress component in case of pending and no cart", async () => {
    store = mockStore({
      ...initialState,
      cart: {
        ...initialState.cart,
        cart: null,
        pending: {
          cart: true,
        },
      },
    });

    render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );

    await screen.findByTestId(/pending-stub/i);
  });

  it("should render CircularProgress component in case there is no product", async () => {
    store = mockStore({
      ...initialState,
      products: {
        ...initialState.products,
        products: [],
      },
    });

    render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );

    await screen.findByTestId(/pending-stub-item/i);
  });

  it("should render error message in case it appears in state", async () => {
    store = mockStore({
      ...initialState,
      cart: {
        ...initialState.cart,
        errors: {
          cart: "testError",
        },
      },
    });

    render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );

    await screen.findByText(/testError/i);
  });

  it("should render done icon in case create order button clicked", async () => {
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );

    await act(() => fireEvent.click(screen.getByTestId("create-order-btn")));

    await screen.findByTestId("done-icon-test");
  });
});
