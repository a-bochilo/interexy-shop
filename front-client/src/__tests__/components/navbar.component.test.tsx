import { fireEvent, render, screen, act, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import store from "../../store";
import theme from "../../theme/mainTheme";
import { BrowserRouter } from "react-router-dom";
import PageNavBarComp from "../../components/navbar.comp";

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

//  navbar.comp.tsx                    |   55.31 |    35.71 |   35.71 |   54.34 | 106,110,114,118,122-137,231-277,291-292
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

  it("button 'open drawer' should be in the document", async () => {
    const handleDrawerOpen = jest.fn().mockResolvedValue(1);
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <PageNavBarComp />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );

    await act(async () =>
      fireEvent.click(
        screen.getByRole("button", {
          name: /open drawer/i,
        })
      )
    );

    const button = await screen.findByLabelText("open drawer");
    await waitFor(() => expect(handleDrawerOpen).toBeDefined());
    expect(button).toBeInTheDocument();
  });
});