// =========================== react ===========================
import axios from "axios";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";

// =========================== mocks ===================================
import { initialState, mockResponse, mockedData } from "../mocks/auth.data.mock";

// =========================== component ===============================
import { handleResponse } from "../../app/login/login.page";
import LoginPage from "../../app/login";

// =========================== enums ===================================
import { UserRoles } from "../../app/roles/types/user-roles.enum";
import { fetchSignIn } from "../../app/login/store/auth.slice";

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
mockedAxios.post.mockResolvedValue({ data: [mockedData] });

jest.mock("../../app/login/store/auth.slice", () => ({
  fetchAuth: jest.fn(),
}));

// =========================== mock store ==============================
const mockStore = configureStore([thunk]);

describe("LoginPage", () => {
  let store: any;

  // beforeEach(() => {
  //   store = mockStore({});
  //   (fetchSignIn as unknown as jest.Mock).mockReturnValue({ type: "test" });
  // });

  it("should render the login form", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
  });
});

// =========================== mock functions =============================
const mockReplace = jest.fn();
const mockSetItem = jest.fn();
const mockGetItem = jest.fn();

Object.defineProperty(window, "location", {
  value: {
    ...window.location,
    replace: mockReplace,
  },
  writable: true,
});

Object.defineProperty(window, "localStorage", {
  value: { ...window.localStorage, setItem: mockSetItem, getItem: mockGetItem },
  writable: true,
});

describe("handleResponse", () => {
  let navigate: jest.Mock;
  const decodeToken = jest.fn();

  beforeEach(() => {
    navigate = jest.fn();
    mockSetItem.mockClear();
    mockReplace.mockClear();
  });

  it("should navigate to /products if the user is not a regular user", () => {
    decodeToken.mockReturnValue({ role_type: UserRoles.admin });
    handleResponse(mockResponse, navigate);
    expect(navigate).toHaveBeenCalledWith("/products");
  });

  it("should set the token in localStorage if the user is not a regular user", () => {
    decodeToken.mockReturnValue({ role_type: UserRoles.admin });
    handleResponse(mockResponse, navigate);
    expect(mockSetItem).toHaveBeenCalledWith("token", mockResponse.payload);
  });
});
