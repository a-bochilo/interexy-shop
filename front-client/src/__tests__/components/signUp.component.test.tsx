/* eslint-disable testing-library/await-async-utils */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
// =========================== React-testing ===========================
import { render, fireEvent, screen, act, waitFor } from "@testing-library/react";

// =========================== Mocks ===================================
import { authWithTranslate } from "../mocks/auth.data.mock";

// =========================== Component ===============================
import SignUpForm from "../../components/signUp-form.component";

describe("SignUpForm", () => {
  const handleSignUp = jest.fn();

  it("displays validation errors on invalid form submit", () => {
    render(
      <SignUpForm
        handleSignUp={handleSignUp}
        fetchingErrors={null}
        fetchingPending={false}
        authWithTranslate={authWithTranslate}
      />
    );
    act(() =>
      fireEvent.change(screen.getByPlaceholderText("example@gmail.com"), {
        target: { value: "2" },
      })
    );

    waitFor(() =>
      expect(
        screen.getByText(/⚠ entered value does not match email format/i)
      ).toBeInTheDocument()
    );

    expect(screen.getByTestId("signUp-stub")).toBeDisabled();
  });

  it("renders CircularProgress when roles are pending", async () => {
    render(
      <SignUpForm
        handleSignUp={handleSignUp}
        fetchingErrors={null}
        fetchingPending={true}
        authWithTranslate={authWithTranslate}
      />
    );
    await screen.findByTestId(/pending-stub/i);
  });

  it("renders DoneIcon when roles are pending and havent errors", async () => {
    render(
      <SignUpForm
        handleSignUp={handleSignUp}
        fetchingErrors={"qwerty"}
        fetchingPending={true}
        authWithTranslate={authWithTranslate}
      />
    );
    await screen.findByTestId(/done-stub/i);
  });

  it("renders Errors when roles are nave errors", async () => {
    render(
      <SignUpForm
        handleSignUp={handleSignUp}
        fetchingErrors={"qwerty"}
        fetchingPending={false}
        authWithTranslate={authWithTranslate}
      />
    );
    await screen.findByTestId(/error-stub/i);
  });
});
