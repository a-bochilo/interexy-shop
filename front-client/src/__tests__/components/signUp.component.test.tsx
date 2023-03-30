/* eslint-disable testing-library/no-node-access */
// =========================== React-testing ===========================
import { render, fireEvent, screen, act } from "@testing-library/react";
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
  const fetchingErrors = null;
  const fetchingPending = false;

  it("displays validation errors on invalid form submit", () => {
    render(
      <SignUpForm
        handleSignUp={handleSignUp}
        fetchingErrors={fetchingErrors}
        fetchingPending={fetchingPending}
        authWithTranslate={authWithTranslate}
      />
    );

    userEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  it("calls handleSignUp with correct user object on form submit", () => {
    render(
      <SignUpForm
        handleSignUp={handleSignUp}
        fetchingErrors={fetchingErrors}
        fetchingPending={fetchingPending}
        authWithTranslate={authWithTranslate}
      />
    );

    userEvent.type(screen.getByLabelText("Email"), "test@example.com");
    userEvent.type(screen.getByLabelText("Password"), "password");
    userEvent.type(screen.getByLabelText("Phone"), "1234567890");
    userEvent.type(screen.getByLabelText("First Name"), "First");
    userEvent.type(screen.getByLabelText("Middle Name"), "Middle");
    userEvent.type(screen.getByLabelText("Last Name"), "Last");

    userEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    expect(handleSignUp).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password",
      phone: "1234567890",
      details: {
        firstname: "First",
        middlename: "Middle",
        lastname: "Last",
      },
    });
  });
});
