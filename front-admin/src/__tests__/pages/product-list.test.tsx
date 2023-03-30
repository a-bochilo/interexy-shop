/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */
import { Provider } from "react-redux";
import thunk from "redux-thunk";

// =========================== React-testing ===========================
import { render, screen } from "@testing-library/react";

// =========================== Mocks ===========================
import configureStore from "redux-mock-store";
import { initialState } from "./products.data.mocks";

// =========================== Component ===========================
import ProductListPage from "../../app/products/product-list.page";

// ====================== Mock useNavi ======================
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate,
}));

// =========================== Mock Store ===========================
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
