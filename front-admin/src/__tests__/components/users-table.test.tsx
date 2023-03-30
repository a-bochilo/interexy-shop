// ========================== react ==========================
import { render } from "@testing-library/react";

// ========================== components =========================
import UsersTable from "../../components/users-table.comp";

// ========================== mock ==========================
import { mockUserWithDetails } from "./user-data-mock";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Users table", () => {
  let mockProps: any;
  const mockHandlers = {
    handleClickRow: jest.fn(),
  };

  beforeEach(() => {
    mockProps = {
      users: [mockUserWithDetails],
      ...mockHandlers,
    };
  });
  it("should render component", () => {
    render(<UsersTable {...mockProps} />);
  });
});
