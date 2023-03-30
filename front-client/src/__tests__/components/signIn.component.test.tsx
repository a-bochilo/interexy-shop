/* eslint-disable testing-library/no-unnecessary-act */

// =========================== React-testing ===========================
import { render, waitFor, screen, act, fireEvent } from "@testing-library/react";

// =========================== Mocks ===================================
import { authWithTranslate } from "../mocks/auth.data.mock";

// =========================== Component ===============================
import SignInForm from "../../components/signIn-form.component";

describe("Sign In component", () => {
  const SubmitHandler = jest.fn().mockResolvedValueOnce(1);
  const handleSignIn = jest.fn().mockResolvedValueOnce(1);
  const handleRedirectToSignUp = jest.fn().mockRejectedValueOnce(1);

  it("should be rendered", async () => {
    render(
      <SignInForm
        handleSignIn={handleSignIn}
        fecthErrors={null}
        handleRedirectToSignUp={handleRedirectToSignUp}
        authWithTranslate={authWithTranslate}
      />
    );
    await act(async () => fireEvent.click(screen.getByText(/Sign In/i)));
    await waitFor(() => expect(SubmitHandler).toBeDefined());

    await act(async () => fireEvent.click(screen.getByText(/Sign In/i)));
    await waitFor(() => expect(handleSignIn).toBeDefined());
  });

  it("should have a submit button", async () => {
    render(
      <SignInForm
        handleSignIn={handleSignIn}
        fecthErrors={null}
        handleRedirectToSignUp={handleRedirectToSignUp}
        authWithTranslate={authWithTranslate}
      />
    );

    await act(async () => fireEvent.click(screen.getByText(/Sign In/i)));
    expect(await screen.findByText("Sign In")).toBeInTheDocument();
  });

  it("should be show error", async () => {
    render(
      <SignInForm
        handleSignIn={handleSignIn}
        fecthErrors={"Error! Test error!"}
        handleRedirectToSignUp={handleRedirectToSignUp}
        authWithTranslate={authWithTranslate}
      />
    );
    expect(screen.getByText("Error! Test error!")).toBeInTheDocument();
  });
});
