/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */
// =========================== lodash ===========================
import _ from "lodash";

// =========================== react ===========================
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import configureStore from "redux-mock-store";

// =========================== component ===========================
import PageNavBarComp from "../../components/navbar.comp";
import { initialState } from "../mocks/cart.data.mocks";

// =========================== mock lodash ===========================
jest.unmock("lodash");
_.debounce = (fn: any, t: any) => fn();
_.startCase = (str: string) => str;

// ====================== mock useNavigate & useParams ======================
const mockedUseNavigate = jest.fn();
let mockedUseParamsResult: any = {
  productId: "c06cbc27-26ee-4455-8983-33fff83c8be8",
};
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUseNavigate,
  useParams: () => mockedUseParamsResult,
}));

// =========================== mock i18n ===========================
const tFunc = (key: string) => {
  const obj = {
    categories: {
      all: "all",
      trousers: "trousers",
      shirts: "shirts",
      shoes: "shoes",
    },
    headerSettings: {
      account: "Account",
      myOrders: "My orders",
      logout: "Logout",
      signIn: "Sign In",
    },
  };
  const objKey =
    (key.split(".")[1] as keyof typeof obj) ?? (key as keyof typeof obj);
  return obj[objKey];
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

// =========================== mock searchComponent ===========================
jest.mock("../../components/search.component", () => () => {
  return <div></div>;
});

// =========================== mock localStorage ===========================
const mockSetItem = jest.fn();
const mockGetItem = jest.fn();

Object.defineProperty(window, "localStorage", {
  value: {
    ...window.localStorage,
    setItem: mockSetItem,
    getItem: mockGetItem,
  },
  writable: true,
});

describe("PageNavBarComp page", () => {
  let store: any;

  beforeEach(() => {
    mockSetItem.mockClear();
    mockGetItem.mockReturnValue("string");
  });

  it("should render component", () => {
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <PageNavBarComp />
      </Provider>
    );
  });

  it("should open drawer in case drawer open-button clicked", async () => {
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <PageNavBarComp />
      </Provider>
    );

    await act(() =>
      fireEvent.click(screen.getByTestId("drawer-open-button-test"))
    );

    await waitFor(() =>
      expect(getComputedStyle(screen.getByTestId("drawer-test")).width).toBe(
        "200px"
      )
    );
  });

  it("should open hidden menu in case user logo clicked", async () => {
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <PageNavBarComp />
      </Provider>
    );

    await act(() =>
      fireEvent.click(screen.getByTestId("open-settings-button-test"))
    );

    await screen.findByTestId("hidden-menu-test");
  });

  it("should call navigate to /profile in case account link in user menu clicked", async () => {
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <PageNavBarComp />
      </Provider>
    );

    await act(() =>
      fireEvent.click(screen.getByTestId("open-settings-button-test"))
    );

    await act(() => fireEvent.click(screen.getByTestId("hidden-menu-account")));

    await waitFor(() =>
      expect(mockedUseNavigate).toHaveBeenCalledWith("/profile")
    );
  });

  it("should call navigate to /orders/profile in case orders link in user menu clicked", async () => {
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <PageNavBarComp />
      </Provider>
    );

    await act(() =>
      fireEvent.click(screen.getByTestId("open-settings-button-test"))
    );

    await act(() =>
      fireEvent.click(screen.getByTestId("hidden-menu-myOrders"))
    );

    await waitFor(() =>
      expect(mockedUseNavigate).toHaveBeenCalledWith("/orders/profile")
    );
  });

  it("should render signIn in case there is no token in localStorage", async () => {
    store = mockStore(initialState);

    mockGetItem.mockReturnValue(null);

    render(
      <Provider store={store}>
        <PageNavBarComp />
      </Provider>
    );

    await screen.findByTestId("sign-in-btn-test");
  });
});
