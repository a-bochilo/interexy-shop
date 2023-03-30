/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */
import { Provider } from "react-redux";
import thunk from "redux-thunk";

// =========================== React-testing ===========================
import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
} from "@testing-library/react";

// =========================== Mocks ===========================
import configureStore from "redux-mock-store";

// =========================== Component ===========================
import PageNavBarComp from "../../components/navbar.comp";

// ====================== Mock useNavi & useParams ======================
const mockedUseNavigate = jest.fn();
jest.mock("react-router", () => ({
    ...(jest.requireActual("react-router") as any),
    useNavigate: () => mockedUseNavigate,
}));

// =========================== Mock i18n ===========================
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

// =========================== Mock Store ===========================
const mockStore = configureStore([thunk]);

// =========================== Mock localStorage ===========================
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
        store = mockStore({});

        render(
            <Provider store={store}>
                <PageNavBarComp />
            </Provider>
        );
    });

    it("should open drawer in case drawer open-button clicked", async () => {
        store = mockStore({});

        render(
            <Provider store={store}>
                <PageNavBarComp />
            </Provider>
        );

        await act(() =>
            fireEvent.click(screen.getByTestId("drawer-open-button-test"))
        );

        await waitFor(() =>
            expect(
                getComputedStyle(screen.getByTestId("drawer-test")).width
            ).toBe("200px")
        );
    });

    it("should open hidden menu in case user logo clicked", async () => {
        store = mockStore({});

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
});
