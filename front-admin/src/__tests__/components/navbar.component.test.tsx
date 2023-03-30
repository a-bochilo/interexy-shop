
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import store from "../../store";
import theme from "../../theme/mainTheme";
import { BrowserRouter } from "react-router-dom";
import PageNavBarComp from "../../components/navbar.comp";

// =========================== React-testing ===========================
import { render } from "@testing-library/react";
// =========================== Mocks ===================================
// =========================== Component ===============================
// =========================== Mock useNavi ============================
// =========================== Mock Store ==============================

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
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
// const mockedAxios = axios as jest.Mocked<typeof axios>;
// mockedAxios.post.mockResolvedValue({ data: [mockProduct] });
// mockedAxios.get.mockResolvedValue({ data: [mockProduct] });

// const mockStore = configureStore([thunk]);

describe("PageAsideComp", () => {
  it("should be render is correctly", () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <PageNavBarComp />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  });
});
