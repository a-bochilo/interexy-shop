import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import SignUpPage from "../../app/auth/signUp.page";
import store from "../../store";
import { fireEvent, render, screen } from "@testing-library/react";

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

  test("should be render is correctly", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUpPage />
        </MemoryRouter>
      </Provider>
    );
  });

