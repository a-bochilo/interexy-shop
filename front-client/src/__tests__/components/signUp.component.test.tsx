/* eslint-disable testing-library/no-node-access */
import { render, act, waitFor, fireEvent, screen } from "@testing-library/react";
import SignUpForm from "../../components/signUp-form.component";
import { authWithTranslate } from "../mocks/data.mocks";

describe("Sign Up component", () => {
  const handleSignUp = jest.fn().mockResolvedValue(1);
  it("should be rendered", async () => {
    render(
      <SignUpForm
        handleSignUp={handleSignUp}
        fetchingErrors={null}
        fetchingPending={true}
        authWithTranslate={authWithTranslate}
      />
    );
  });

  it("should be have disabled button", async () => {
    render(
      <SignUpForm
        handleSignUp={handleSignUp}
        fetchingErrors={"Error"}
        fetchingPending={true}
        authWithTranslate={authWithTranslate}
      />
    );
    fireEvent.input(screen.getByPlaceholderText(/example@gmail\.com/i), {
      target: {
        value: "",
      },
    });
    expect(
      screen
        .getByRole("button", {
          name: /sign up/i,
        })
        .closest("button")
    ).toHaveAttribute("disabled");
  });

  it("should render error text in case wrong fetching error appears", async () => {
    render(
      <SignUpForm
        handleSignUp={handleSignUp}
        fetchingErrors={"Error! Test error!"}
        fetchingPending={false}
        authWithTranslate={authWithTranslate}
      />
    );
    await screen.findByText(/Error! Test error!/i);
  });
});
