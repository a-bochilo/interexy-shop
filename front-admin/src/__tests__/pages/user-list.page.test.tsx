// ========================== react ==========================
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import axios from "axios";

// ========================== redux ==========================
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

// ========================== components ==========================
import { initialState, mockUser } from "../components/user-data-mock";
import UserListPage from "../../app/users/user-list.page";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

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
mockedAxios.post.mockResolvedValue({ data: [mockUser] });
mockedAxios.get.mockResolvedValue({ data: [mockUser] });

const mockStore = configureStore([thunk]);

describe("User list page", () => {
  let store: any;

  it("should render component", () => {
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <UserListPage />
      </Provider>
    );
  });
});
