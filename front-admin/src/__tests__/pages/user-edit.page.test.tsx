/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
// ========================== react ==========================
import { Provider } from "react-redux";
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import axios from "axios";

// ========================== redux ==========================
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

// ========================== components ==========================
import {
  initialState,
  initialStateWithUserInfoIsNull,
  mockUser,
  mockUserDetails,
} from "../components/user-data-mock";
import UserEditPage from "../../app/users/user-edit.page";

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

// ====================== Mock useNavigate & useParams ======================
const mockedUseNavigate = jest.fn();
let mockedUseParamsResult: any = {
  userId: "6966bd54-fe41-4e92-b15b-4f5fbac9ee1e",
};
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUseNavigate,
  useParams: () => mockedUseParamsResult,
}));

// ======================== Mock Buttons ========================
jest.mock(
  "../../components/user-edit-form.comp",
  () =>
    ({ handleSave, handleDelete }: any) => {
      return (
        <div>
          <button data-testid="handleSave" onClick={() => handleSave()}>
            Click
          </button>
          <button data-testid="handleDelete" onClick={() => handleDelete()}>
            Click2
          </button>
        </div>
      );
    }
);

describe("User edit page", () => {
  let store: any;

  it("should render component", () => {
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <UserEditPage />
      </Provider>
    );
  });

  it("should call handleSave in case nested button clicked", async () => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
    render(
      <Provider store={store}>
        <UserEditPage />
      </Provider>
    );

    const saveButton = screen.getByTestId("handleSave");

    await act(() => fireEvent.click(saveButton));

    await waitFor(() => {
      expect(store.dispatch).toBeCalled();
    });
  });

  it("should render CircularProgress component in case of userInfo is null", async () => {
    store = mockStore(initialStateWithUserInfoIsNull);

    render(
      <Provider store={store}>
        <UserEditPage />
      </Provider>
    );
    await screen.findByTestId(/test-progress/i);
  });

  it("should call handleDelete in case nested button clicked", async () => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
    render(
      <Provider store={store}>
        <UserEditPage />
      </Provider>
    );

    const deleteButton = screen.getByTestId("handleDelete");

    await act(() => fireEvent.click(deleteButton));

    await waitFor(() => {
      expect(store.dispatch).toBeCalled();
    });
  });

  it("should render CircularProgress component in case of userId is null", async () => {
    store = mockStore(initialState);
    mockedUseParamsResult = {
      userId: null,
    };

    render(
      <Provider store={store}>
        <UserEditPage />
      </Provider>
    );
    await screen.findByTestId(/test-progress/i);
  });
});
