import { render, act, waitFor, fireEvent, screen } from "@testing-library/react";
import SignUpForm from "../signUp-form.component";
import { authWithTranslate } from "./mocks/data.mocks";
import { Button } from "@mui/material";

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
    await act(async () => fireEvent.click(screen.getByRole("button")));
    await waitFor(() => expect(handleSignUp).toBeDefined());
  });

  it("should be create submit button is active", async () => {
    render(
      <SignUpForm
        handleSignUp={handleSignUp}
        fetchingErrors={null}
        fetchingPending={false}
        authWithTranslate={authWithTranslate}
      />
    );

    fireEvent.input(screen.getByPlaceholderText(/elvis/i), {
      target: {
        value: "Elvis",
      },
    });

    fireEvent.input(screen.getByPlaceholderText(/aaron/i), {
      target: {
        value: "Aaron",
      },
    });

    fireEvent.input(screen.getByPlaceholderText(/presley/i), {
      target: {
        value: "Presley",
      },
    });

    fireEvent.input(screen.getByPlaceholderText(/example@gmail\.com/i), {
      target: {
        value: "123test123@mail.com",
      },
    });

    fireEvent.input(screen.getByPlaceholderText(/\+375 xx xxx xx xx/i), {
      target: {
        value: "+375291111111",
      },
    });

    fireEvent.input(screen.getByPlaceholderText(/password/i), {
      target: {
        value: "123123",
      },
    });

    fireEvent.input(screen.getByPlaceholderText(/confirmpass/i), {
      target: {
        value: "123123",
      },
    });
    await act(async () => fireEvent.click(screen.getByRole("button")));
  });

  it("should render error text in case wrong fetching error appears", async () => {
    render(
      <SignUpForm
        handleSignUp={handleSignUp}
        fetchingErrors={"Error!"}
        fetchingPending={false}
        authWithTranslate={authWithTranslate}
      />
    );

    fireEvent.input(screen.getByPlaceholderText(/example@gmail\.com/i), {
      target: {
        value: "123@ com",
      },
    });

    await screen.findByText(/⚠ entered value does not match email format/i);
  });
});
