/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */

// =========================== react ===========================
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";

// =========================== component ===========================
import ProductViewPage from "../../app/products/product-view.page";

// =========================== mock ===========================
import {
  initialState,
  mockProduct,
  mockProductDetails,
} from "../mocks/products.data.mocks";

// ====================== mock useNavigate ======================
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
  useParams: () => ({ productId: "c06cbc27-26ee-4455-8983-33fff83c8be8" }),
}));

// =========================== mock store ===========================
const mockStore = configureStore([thunk]);

describe("ProductView page", () => {
  let store: any;

  it("should render component", () => {
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ProductViewPage />
      </Provider>
    );
  });

  it("should render CircularProgress component in case of products pending", async () => {
    store = mockStore({
      products: {
        products: [mockProduct],
        productDetails: mockProductDetails,
        pending: {
          products: true,
          productDetails: false,
          filter: false,
        },
        errors: {
          products: null,
          productDetails: null,
          filter: null,
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

  it("should render nested component", () => {
    store = mockStore({
      products: {
        products: [mockProduct],
        productDetails: undefined,
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
    });

    const { container } = render(
      <Provider store={store}>
        <ProductViewPage />
      </Provider>
    );
    // eslint-disable-next-line testing-library/no-container
    const containerDiv = container.getElementsByClassName(
      "MuiGrid-root css-7exlja-MuiGrid-root"
    );
    //expect(containerDiv[0]).toBeEmptyDOMElement();
  });
});
