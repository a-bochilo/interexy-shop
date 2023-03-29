/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react";
import SignUpPage from "../../app/auth/signUp.page";
import { Provider } from "react-redux";
import axios from "axios";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { initialState } from "../mocks/data.mocks";
import { Grid } from "@mui/material";

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

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.post.mockResolvedValue({ data: "fake token" });

let mockStore = configureStore([thunk]);

describe("Sign Up page", () => {
  let store: any;
  it("should be rendered", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <SignUpPage />
      </Provider>
    );
  });

  it("should be rendered with token error", async () => {
    store = mockStore({
      auth: {
        token: "",
        errors: {
          token: "Error! Test error!",
        },
        pending: {
          token: false,
        },
      },
    });
    render(
      <Provider store={store}>
        <SignUpPage />
      </Provider>
    );
    await screen.findByText(/Error! Test error!/i);
  });

  it("Grid component renders with correct styles", () => {
    const { container } = render(
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: "400px",
        }}
      />
    );
    const grid = container.firstChild;
    expect(grid).toHaveStyle("display: flex");
    expect(grid).toHaveStyle("flex-direction: column");
    expect(grid).toHaveStyle("min-width: 400px");
  });
});
