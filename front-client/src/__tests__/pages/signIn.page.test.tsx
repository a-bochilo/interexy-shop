import axios from "axios";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";

// =========================== React-testing ===========================
import { render } from "@testing-library/react";

// =========================== Mocks ===================================

// =========================== Component ===============================

// =========================== Enums ===================================
import SignInPage, { handleResponse } from "../../app/auth/signIn.page";
import { initialState, mockedData } from "../mocks/auth.data.mock";
import { UserRoles } from "../../app/users/types/user-roles.enum";

// =========================== Mock i18n ==============================
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

jest.mock("../../app/auth/store/auth.slice", () => ({
  fetchAuth: jest.fn(),
}));

// =========================== Mock Store ==============================
const mockStore = configureStore([thunk]);

describe("Sign In Page", () => {
  let store: any;

  it("should render the signUp form", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignInPage />
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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNlYTlmZTFlLWY0OGEtNGE0Yy1iYWVhLWIxMTA0MWMzNWQ4NyIsImVtYWlsIjoic3VwZXJhZG1pbkBnbWFpbC5jb20iLCJwaG9uZSI6IiszNzUgMjkgMDAwIDAwIDAwIiwiY3JlYXRlZCI6MTY3OTY1MTMyNzcxOSwidXBkYXRlZCI6MTY3OTY1MTMyNzcxOSwicm9sZV9pZCI6MSwicm9sZV90eXBlIjoidXNlciIsImlhdCI6MTY4MDEzMzMwMSwiZXhwIjoxNjgwMTM2OTAxfQ.blF0dGVF4rV4zDFrY0AyVTw5HrjYG09AmLtYhfK4TW0",
    };
    decodeToken.mockReturnValue({ role_type: UserRoles.user });
    handleResponse(response, navigate);
    expect(navigate).toHaveBeenCalledWith("/products");
    expect(handleResponse(response, navigate)).toEqual(true);
  });

  it("should replace the location if the user is a regular user", () => {
    const response = {
      payload:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNlYTlmZTFlLWY0OGEtNGE0Yy1iYWVhLWIxMTA0MWMzNWQ4NyIsImVtYWlsIjoic3VwZXJhZG1pbkBnbWFpbC5jb20iLCJwaG9uZSI6IiszNzUgMjkgMDAwIDAwIDAwIiwiY3JlYXRlZCI6MTY3OTY1MTMyNzcxOSwidXBkYXRlZCI6MTY3OTY1MTMyNzcxOSwicm9sZV9pZCI6MSwicm9sZV90eXBlIjoic3VwZXJhZG1pbiIsImlhdCI6MTY4MDEzMzMwMSwiZXhwIjoxNjgwMTM2OTAxfQ.6HrGVr1GW6VhedHSFaLAjAku_snfZhsmL_fAhLaPmnY",
    };
    decodeToken.mockReturnValue({ role_type: UserRoles.superadmin });
    handleResponse(response, navigate);
    expect(mockReplace).toHaveBeenCalledWith("http://localhost:3000");
    expect(handleResponse(response, navigate)).toEqual(false);
  });
});
