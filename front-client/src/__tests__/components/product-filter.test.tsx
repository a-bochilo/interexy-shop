/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */
import { Provider } from "react-redux";
import thunk from "redux-thunk";

// =========================== React-testing ===========================
import {
    render,
    screen,
    fireEvent,
    act,
    waitFor,
} from "@testing-library/react";

// =========================== Mocks ===========================
import { mockProduct, initialState } from "./products.data.mocks";
import configureStore from "redux-mock-store";

// =========================== Component ===========================
import ProductFilterForm from "../../components/product-filter-form.component";

// =========================== Mock i18n ===========================
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

// ====================== Mock useNavi ======================
const mockedUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUseNavigate,
}));

// =========================== Mock Store ===========================
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

        const { container } = render(
            <Provider store={store}>
                <ProductFilterForm />
            </Provider>
        );

        const input = container.querySelector(
            'input[name="minPrice"]'
        ) as HTMLInputElement;

        await act(() => fireEvent.change(input, { target: { value: -5 } }));

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

        const { container } = render(
            <Provider store={store}>
                <ProductFilterForm />
            </Provider>
        );

        const input = container.querySelector(
            'input[name="category"]'
        ) as HTMLInputElement;

        await act(
            async () =>
                await fireEvent.change(input, { target: { value: "trousers" } })
        );

        await act(
            async () => await fireEvent.click(screen.getByTestId("filter-btn"))
        );

        await screen.findByTestId("done-icon-test");
    });

    it("should clear form in case of reset btn clicked", async () => {
        store = mockStore(initialState);

        const { container } = render(
            <Provider store={store}>
                <ProductFilterForm />
            </Provider>
        );

        const input = container.querySelector(
            'input[name="minPrice"]'
        ) as HTMLInputElement;

        await act(() =>
            fireEvent.change(input, {
                target: { value: "test-name-string" },
            })
        );

        await act(() => fireEvent.click(screen.getByTestId("reset-btn")));
        fireEvent.click(screen.getByTestId("reset-btn"));

        expect(input.value).toBe("");
    });
});
