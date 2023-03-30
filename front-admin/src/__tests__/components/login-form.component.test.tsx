/* eslint-disable testing-library/no-unnecessary-act */
// =========================== React-testing ===========================
import { render, waitFor, screen, act, fireEvent } from "@testing-library/react";

// =========================== Component ===============================
import LoginForm from "../../components/login-form.comp";

describe("Sign In component", () => {
  const handleSave = jest.fn();

  it("should be rendered", async () => {
    render(<LoginForm handleSave={handleSave} error={false} />);
    await act(async () => fireEvent.click(screen.getByTestId("loginButton")));
    await waitFor(() => expect(handleSave).toBeDefined());

    await act(async () => fireEvent.click(screen.getByTestId("loginButton")));
    await waitFor(() => expect(handleSave).toBeDefined());
  });

  it("should have a submit button", async () => {
    render(<LoginForm handleSave={handleSave} error={false} />);

    await act(async () => fireEvent.click(screen.getByTestId("loginButton")));
    expect(screen.getByTestId("loginButton")).toBeInTheDocument();
  });

  it("should be show error", async () => {
    render(<LoginForm handleSave={handleSave} error={true} />);
    expect(screen.getByText("ERROR: FAILED TO SIGNIN")).toBeInTheDocument();
  });
});
