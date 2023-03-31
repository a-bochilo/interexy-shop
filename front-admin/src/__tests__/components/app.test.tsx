// ========================== react ==========================
import React from "react";
import axios from "axios";
import { act, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

// ========================== mui ==========================
import { ThemeProvider } from "@mui/material";

// ========================== etc ==========================
import theme from "../../theme/mainTheme";
import AppRoutes from "../../app.routes";
import ErrorBoundaryComp from "../../components/error-boundary.comp";
import store from "../../store";

// ========================== axios mock ==========================
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

mockedAxios.post.mockResolvedValue({});

describe("App component", () => {
  it("App renders", () => {
    render(
      <ErrorBoundaryComp>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Router>
              <AppRoutes />
            </Router>
          </ThemeProvider>
        </Provider>
      </ErrorBoundaryComp>
    );
  });
});
