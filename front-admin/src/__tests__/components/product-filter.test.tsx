/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */

// =========================== react ===========================
import {
    render,
    screen,
    fireEvent,
    act,
    waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

// =========================== component ===========================
import ProductFilterForm from "../../components/product-filter-form.component";

// =========================== mocks ===========================
import { mockProduct, initialState } from "../mocks/products.data.mocks";

// ====================== mock useNavigate ======================
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate,
}));

// =========================== mock store ===========================
const mockStore = configureStore([thunk]);

describe("ProductFilterForms", () => {
    let store: any;

    it("should render component", () => {
        store = mockStore(initialState);

        render(
            <Provider store={store}>
                <ProductFilterForm />
            </Provider>
        );
    });

    it("should make filter button disabled in case wrong data intered", async () => {
        store = mockStore(initialState);

        render(
            <Provider store={store}>
                <ProductFilterForm />
            </Provider>
        );

        await act(() =>
            fireEvent.change(
                screen
                    .getByLabelText("minQuantity")
                    .querySelector("input") as HTMLInputElement,
                { target: { value: -5 } }
            )
        );

        await waitFor(() =>
            expect(screen.getByTestId("filter-btn")).toBeDisabled()
        );
    });

    it("should render CircularProgress component in case of pending", async () => {
        store = mockStore({
            products: {
                products: [mockProduct],
                productDetails: undefined,
                pending: {
                    products: false,
                    productDetails: false,
                    filter: true,
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
                <ProductFilterForm />
            </Provider>
        );

        await screen.findByTestId(/pending-stub/i);
    });

    it("should render DoneIcon in case of no pending & erorrs", async () => {
        store = mockStore(initialState);

        render(
            <Provider store={store}>
                <ProductFilterForm />
            </Provider>
        );

        await act(() => fireEvent.click(screen.getByTestId("filter-btn")));
        fireEvent.click(screen.getByTestId("filter-btn"));

        await screen.findByTestId("done-icon-test");
    });

    it("should render error message in case if error appears in state", async () => {
        store = mockStore({
            products: {
                products: [mockProduct],
                productDetails: undefined,
                pending: {
                    products: false,
                    productDetails: false,
                    filter: true,
                },
                errors: {
                    products: null,
                    productDetails: null,
                    filter: "test filter error",
                },
            },
        });

        render(
            <Provider store={store}>
                <ProductFilterForm />
            </Provider>
        );

        await screen.findByTestId("filter-error-test");
    });

    it("should clear form in case of reset btn clicked", async () => {
        store = mockStore(initialState);

        render(
            <Provider store={store}>
                <ProductFilterForm />
            </Provider>
        );

        const input = screen
            .getByLabelText("minQuantity")
            .querySelector("input") as HTMLInputElement;

        await act(() =>
            fireEvent.change(input, {
                target: { value: "test-name-string" },
            })
        );

        await act(() => fireEvent.click(screen.getByTestId("reset-btn")));

        expect(input.value).toBe("");
    });
});
