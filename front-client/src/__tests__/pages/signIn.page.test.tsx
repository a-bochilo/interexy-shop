/* eslint-disable testing-library/prefer-presence-queries */
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import SignInPage from "../../app/auth/signIn.page";
import store from "../../store";
import theme from "../../theme/mainTheme";

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

test("handleSignIn sends fetch request with uncorrect arguments", async () => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve({ token: "fake_token" }),
    })
  );

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <SignInPage />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
  // const buttons = screen.getAllByRole("button");
  // await act(async () => fireEvent.click(buttons[1]));
  // await waitFor(() => expect(window.location.pathname).toBe("/auth/signUp"));
});

// fireEvent.change(screen.getByPlaceholderText(/example@gmail\.com/i), {
//   target: { value: "123123@mail.com" },
// });
// fireEvent.change(screen.getByPlaceholderText(/password/i), {
//   target: { value: "123123123" },
// });

// const buttons = screen.getAllByRole("button");
// await act(async () => fireEvent.click(buttons[0]));
// await expect(buttons[0]).toBeDefined()
