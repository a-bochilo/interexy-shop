/* eslint-disable testing-library/await-async-utils */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
// =========================== React-testing ===========================
import { render, fireEvent, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// =========================== Mocks ===================================
import { authWithTranslate } from "../mocks/auth.data.mock";

// =========================== Component ===============================
import SignUpForm from "../../components/signUp-form.component";

// describe("Sign Up component", () => {
//   const handleSignUp = jest.fn().mockResolvedValue(1);
//   it("should be rendered", async () => {
//     render(
//       <SignUpForm
//         handleSignUp={handleSignUp}
//         fetchingErrors={null}
//         fetchingPending={true}
//         authWithTranslate={authWithTranslate}
//       />
//     );
//   });

//   it("should be have disabled button", async () => {
//     render(
//       <SignUpForm
//         handleSignUp={handleSignUp}
//         fetchingErrors={""}
//         fetchingPending={true}
//         authWithTranslate={authWithTranslate}
//       />
//     );
//     fireEvent.input(screen.getByPlaceholderText(/example@gmail\.com/i), {
//       target: {
//         value: "",
//       },
//     });
//     expect(
//       screen
//         .getByRole("button", {
//           name: /sign up/i,
//         })
//         .closest("button")
//     ).toHaveAttribute("disabled");
//   });

//   it("should render error text in case wrong fetching error appears", async () => {
//     render(
//       <SignUpForm
//         handleSignUp={handleSignUp}
//         fetchingErrors={"Error! Test error!"}
//         fetchingPending={false}
//         authWithTranslate={authWithTranslate}
//       />
//     );
//     await screen.findByText(/Error! Test error!/i);
//   });

//   it("calls handleSignUp with correct user object", () => {
//     const data = {
//       email: "test@example.com",
//       password: "password",
//       phone: "1234567890",
//       firstName: "First",
//       middleName: "Middle",
//       lastName: "Last",
//     };
//     const onSubmit = jest.fn().mockResolvedValue(handleSignUp(data));
//     render(
//       <SignUpForm
//         handleSignUp={handleSignUp}
//         fetchingErrors={""}
//         fetchingPending={false}
//         authWithTranslate={authWithTranslate}
//       />
//     );
//     fireEvent.click(
//       screen.getByRole("button", {
//         name: /sign up/i,
//       })
//     );

//     expect(onSubmit).toHaveBeenCalledWith({
//       email: "test@example.com",
//       password: "password",
//       phone: "1234567890",
//       details: {
//         firstname: "First",
//         middlename: "Middle",
//         lastname: "Last",
//       },
//     });
//   });
// });

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
