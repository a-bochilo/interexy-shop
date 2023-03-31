/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */

// =========================== react ===========================
import { Provider } from "react-redux";
import axios from "axios";
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";

// =========================== mocks ===================================
import { role } from "../mocks/role.data.mock";

// =========================== component ===============================
import RoleViewPage from "../../app/roles/role-view.page";

// =========================== mock useNavigate ============================
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
  useParams: () => ({ roleId: "1" }),
}));

// =========================== mock axios ==============================
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
mockedAxios.get.mockResolvedValue({ data: [role] });

// =========================== mock store ==============================
const mockStore = configureStore([thunk]);

describe("RolesListPage", () => {
  let store;

  test("render component with roles", async () => {
    store = mockStore({
      roles: {
        roles: [role],
        chosenRole: role,
        pending: {
          roles: false,
          chosenRole: false,
        },
        errors: {
          roles: null,
          chosenRole: null,
        },
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RoleViewPage />
        </MemoryRouter>
      </Provider>
    );
  });

  test("renders CircularProgress when roles are pending", async () => {
    store = mockStore({
      roles: {
        roles: [],
        chosenRole: undefined,
        pending: {
          roles: true,
          chosenRole: true,
        },
        errors: {
          roles: null,
          chosenRole: null,
        },
      },
    });
    render(
      <Provider store={store}>
        <RoleViewPage />
      </Provider>
    );
    await screen.findByTestId(/pending-stub/i);
  });
});
