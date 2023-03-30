test.skip("skip", () => {});

export const authWithTranslate = {
  login: "Login",
  email: "Email",
  password: "Password",
  confirmPassword: "Confirm password",
  signIn: "Sign In",
  signUp: "Sign Up",
  firstName: "First name",
  middleName: "Middle name",
  lastName: "Last name",
  phone: "Phone",
};

export const mockRegisterData = {
  firstname: "some",
  middlename: "some",
  lastname: "some",
  email: "example@mail.com",
  password: "111111",
  confirmPassword: "111111",
  phone: "+375291111231",
};

export const FormSignInInput = {
  email: "test@test.com",
  password: "123123123",
};

export const initialState = {
    auth: {
      token: "",
      errors: {
        token: null,
      },
      pending: {
        token: false,
      },
    },
  };