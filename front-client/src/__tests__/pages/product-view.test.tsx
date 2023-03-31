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
import ProductViewPage from "../../app/products/product-view.page";

// =========================== mock lodash ===========================
jest.unmock("lodash");
_.debounce = (fn: any, t: any) => fn();

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
    productsFilterForm: {
      formTitle: "Filter products",
      selectCategory: "Select category",
      name: "name",
      brand: "brand",
      minPrice: "minPrice",
      maxPrice: "maxPrice",
      filterButtonTitle: "filter",
      resetButtonTitle: "reset",
    },
    productInfo: {
      category: "category",
      name: "name",
      brand: "brand",
      color: "color",
      material: "material",
      size: "size",
      description: "description",
    },
    categories: {
      all: "all",
      trousers: "trousers",
      shirts: "shirts",
      shoes: "shoes",
    },
  };
  const objKey = key.split(".")[1] as keyof typeof obj;
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

// ======================== mock cartButton ========================
jest.mock(
  "../../components/cart-button.compoent",
  () =>
    ({ handleAddToCartLocal }: any) => {
      return (
        <div>
          <button
            data-testid="handleAddToCart-clicker"
            onClick={() => handleAddToCartLocal()}
          >
            Click
          </button>
        </div>
      );
    }
);

describe("ProductView page", () => {
  let store: any;

  it("should render component", () => {
    store = mockStore(initialStateWithCart);

    render(
      <Provider store={store}>
        <ProductViewPage />
      </Provider>
    );
  });

  it("should render CircularProgress component in case of products pending", async () => {
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
        <ProductViewPage />
      </Provider>
    );

    await screen.findByTestId(/pending-stub/i);
  });

  it("should handleBack in case button clicked", async () => {
    store = mockStore(initialStateWithCart);

    render(
      <Provider store={store}>
        <ProductViewPage />
      </Provider>
    );

    const btn = screen.getByTestId("btn-back-test");
    await act(() => fireEvent.click(btn));

    expect(mockedUseNavigate).toBeCalledTimes(1);
  });

  it("should not render component", async () => {
    store = mockStore({
      ...initialStateWithCart,
      products: {
        ...initialStateWithCart.products,
        products: [],
        productDetails: undefined,
      },
    });
    mockedUseParamsResult = {};

    render(
      <Provider store={store}>
        <ProductViewPage />
      </Provider>
    );

    expect(screen.queryByText("brand")).not.toBeInTheDocument();
  });
});
