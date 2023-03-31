/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */

// =========================== react ===========================
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";

// =========================== mocks ===========================
import { initialState } from "../mocks/products.data.mocks";

// =========================== component ===========================
import ProductListPage from "../../app/products/product-list.page";

// ====================== mock useNavigate ======================
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

// =========================== mock store ===========================
const mockStore = configureStore([thunk]);

describe("ProductList page", () => {
  let store: any;

  it("should render component", () => {
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ProductListPage />
      </Provider>
    );
  });

  it("should render CircularProgress component in case of pending", async () => {
    store = mockStore({
      products: {
        ...initialState.products,
        pending: {
          ...initialState.products.pending,
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
});
