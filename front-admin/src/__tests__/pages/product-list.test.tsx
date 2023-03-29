/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import axios from "axios";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import ProductListPage from "../../app/products/product-list.page";
import { initialState, mockProduct } from "./products.data.mocks";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate,
}));

jest.mock("axios", () => ({
    post: jest.fn(),
    get: jest.fn(),
    create: () => {
        return {
            interceptors: {
                request: { eject: jest.fn(), use: jest.fn() },
                response: { eject: jest.fn(), use: jest.fn() },
            },
        };
    },
}));
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.post.mockResolvedValue({ data: [mockProduct] });
mockedAxios.get.mockResolvedValue({ data: [mockProduct] });

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
                products: [mockProduct],
                productDetails: undefined,
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
                <ProductListPage />
            </Provider>
        );

        await screen.findByTestId(/pending-stub/i);
    });
});
