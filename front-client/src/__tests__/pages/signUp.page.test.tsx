/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
// =========================== axios ===================================
import axios from "axios";

// =========================== store ===================================
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

// =========================== react-testing ===========================
import { render } from "@testing-library/react";

// =========================== mocks ===================================
import { initialState } from "../mocks/auth.data.mock";

// =========================== component ===============================
import SignUpPage, {
  buildUserForDB,
  checkTokenStatus,
} from "../../app/auth/signUp.page";

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
mockedAxios.post.mockResolvedValue({ data: "fake token" });

// =========================== mock i18n ==============================
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

// =========================== mock useNavi ============================]
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

// =========================== mock store ==============================
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
});

// =========================== mock functions =============================
const mockGetItem = jest.fn();
const mockSetItem = jest.fn().mockReturnValue("fakeToken");

Object.defineProperty(window, "localStorage", {
  value: { ...window.localStorage, setItem: mockSetItem, getItem: mockGetItem },
  writable: true,
});

describe("Methods in signUp page", () => {
  let navigate = jest.fn();

  it("buildUserForDB should be return correct user", () => {
    const data = {
      email: "test@example.com",
      password: "password",
      phone: "1234567890",
      firstName: "First",
      middleName: "Middle",
      lastName: "Last",
    };
    const correctData = {
      email: "test@example.com",
      password: "password",
      phone: "1234567890",
      details: {
        firstname: "First",
        middlename: "Middle",
        lastname: "Last",
      },
    };
    buildUserForDB(data);
    expect(buildUserForDB(data)).toEqual(correctData);
  });

  it("checkTokenStatus should be return set token in localStorage and navigate to /products", () => {
    checkTokenStatus("fullfilled", "fakeToken", navigate);
    expect(navigate).toHaveBeenCalledWith("/products");
  });

  it("checkTokenStatus should be return nothing, becouse token status is rejected", () => {
    checkTokenStatus("rejected", "fakeToken", navigate);
    expect(navigate).not.toHaveBeenCalledWith("/products");
  });
});
