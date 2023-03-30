import axios from "axios";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";

// =========================== React-testing ===========================
import { render } from "@testing-library/react";

// =========================== Mocks ===================================
import { mockedData } from "../mocks/auth.data.mock";

// =========================== Component ===============================
import { fetchAuth } from "../../app/login/store/auth.slice";
import { handleResponse } from "../../app/login/login.page";
import LoginPage from "../../app/login";

// =========================== Enums ===================================
import { UserRoles } from "../../app/roles/types/user-roles.enum";

// =========================== Mock Axios ==============================
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

// =========================== Mock Store ==============================
const mockStore = configureStore([thunk]);

describe("LoginPage", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({});
    (fetchAuth as unknown as jest.Mock).mockReturnValue({ type: "test" });
  });

  it("should render the login form", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
  });
});

// =========================== Mock Functions =============================
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
    const response = {
      payload:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNlYTlmZTFlLWY0OGEtNGE0Yy1iYWVhLWIxMTA0MWMzNWQ4NyIsImVtYWlsIjoic3VwZXJhZG1pbkBnbWFpbC5jb20iLCJwaG9uZSI6IiszNzUgMjkgMDAwIDAwIDAwIiwiY3JlYXRlZCI6MTY3OTY1MTMyNzcxOSwidXBkYXRlZCI6MTY3OTY1MTMyNzcxOSwicm9sZV9pZCI6MSwicm9sZV90eXBlIjoiYWRtaW4iLCJpYXQiOjE2ODAxMzMzMDEsImV4cCI6MTY4MDEzNjkwMX0.jjeeBm0mJIH5YqoXI0ZDuh-8nghCDFP9-S-C-YbiuIg",
    };
    decodeToken.mockReturnValue({ role_type: UserRoles.admin });
    handleResponse(response, navigate);
    expect(navigate).toHaveBeenCalledWith("/products");
  });

  it("should replace the location if the user is a regular user", () => {
    const response = {
      payload:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNlYTlmZTFlLWY0OGEtNGE0Yy1iYWVhLWIxMTA0MWMzNWQ4NyIsImVtYWlsIjoic3VwZXJhZG1pbkBnbWFpbC5jb20iLCJwaG9uZSI6IiszNzUgMjkgMDAwIDAwIDAwIiwiY3JlYXRlZCI6MTY3OTY1MTMyNzcxOSwidXBkYXRlZCI6MTY3OTY1MTMyNzcxOSwicm9sZV9pZCI6MSwicm9sZV90eXBlIjoidXNlciIsImlhdCI6MTY4MDEzMzMwMSwiZXhwIjoxNjgwMTM2OTAxfQ.blF0dGVF4rV4zDFrY0AyVTw5HrjYG09AmLtYhfK4TW0",
    };
    decodeToken.mockReturnValue({ role_type: UserRoles.user });
    handleResponse(response, navigate);
    expect(mockReplace).toHaveBeenCalledWith("http://localhost:3001");
  });

  it("should set the token in localStorage if the user is not a regular user", () => {
    const response = {
      payload:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNlYTlmZTFlLWY0OGEtNGE0Yy1iYWVhLWIxMTA0MWMzNWQ4NyIsImVtYWlsIjoic3VwZXJhZG1pbkBnbWFpbC5jb20iLCJwaG9uZSI6IiszNzUgMjkgMDAwIDAwIDAwIiwiY3JlYXRlZCI6MTY3OTY1MTMyNzcxOSwidXBkYXRlZCI6MTY3OTY1MTMyNzcxOSwicm9sZV9pZCI6MSwicm9sZV90eXBlIjoiYWRtaW4iLCJpYXQiOjE2ODAxMzMzMDEsImV4cCI6MTY4MDEzNjkwMX0.jjeeBm0mJIH5YqoXI0ZDuh-8nghCDFP9-S-C-YbiuIg",
    };
    decodeToken.mockReturnValue({ role_type: UserRoles.admin });
    handleResponse(response, navigate);
    expect(mockSetItem).toHaveBeenCalledWith("token", response.payload);
  });
});
