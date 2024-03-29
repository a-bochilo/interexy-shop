/* eslint-disable testing-library/no-unnecessary-act */
// =========================== react testing library ===========================
import { render, waitFor, screen, act, fireEvent } from "@testing-library/react";

// =========================== component ===============================
import LoginForm from "../../components/login-form.comp";

describe("Sign In component", () => {
  const handleSave = jest.fn();

  it("should be rendered", async () => {
    render(<LoginForm handleSave={handleSave} fetchingErrors={null} />);
    await act(async () => fireEvent.click(screen.getByTestId("loginButton")));
    await waitFor(() => expect(handleSave).toBeDefined());

    await act(async () => fireEvent.click(screen.getByTestId("loginButton")));
    await waitFor(() => expect(handleSave).toBeDefined());
  });

  it("should have a submit button", async () => {
    render(<LoginForm handleSave={handleSave} fetchingErrors={null}  />);

    await act(async () => fireEvent.click(screen.getByTestId("loginButton")));
    expect(screen.getByTestId("loginButton")).toBeInTheDocument();
  });

  it("should show an error", async () => {
    render(<LoginForm handleSave={handleSave} fetchingErrors={"Error"}  />);
    expect(screen.getByTestId(/error-stub/i)).toBeInTheDocument();
  });
});
