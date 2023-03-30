/* eslint-disable testing-library/no-unnecessary-act */
// ========================== react ==========================
import { Provider } from "react-redux";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import axios from "axios";
import * as redux from "react-redux";

// ========================== redux ==========================
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

// ========================== components ==========================
import { initialState, mockUser } from "../components/user-data-mock";
import UserAssignRolePage from "../../app/users/user-assign-role.page";

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

// ======================== Mock AssignRoleButton ========================
jest.mock(
  "../../components/user-assign-role-form.comp",
  () =>
    ({ handleSave }: any) => {
      return (
        <div>
          <button data-testid="handleSave" onClick={() => handleSave()}>
            Click
          </button>
        </div>
      );
    }
);

describe("User assign role page", () => {
  let store: any;

  it("should render component", () => {
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <UserAssignRolePage />
      </Provider>
    );
  });
  it("should call handleSave in case nested button clicked", async () => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
    render(
      <Provider store={store}>
        <UserAssignRolePage />
      </Provider>
    );

    const saveButton = screen.getByTestId("handleSave");

    await act(() => fireEvent.click(saveButton));

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
        <UserAssignRolePage />
      </Provider>
    );
    await screen.findByTestId(/test-progress/i);
  });
});
