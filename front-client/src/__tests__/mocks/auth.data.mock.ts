// =========================== interfaces ===================================
import { IAuthTranslate } from "../../app/auth/types/auth-translate.interface";

test.skip("skip", () => {});

// ========================== auth with translate ==========================
export const authWithTranslate: IAuthTranslate = {
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

// ========================== mock register data ==========================
export const mockRegisterData = {
  firstname: "some",
  middlename: "some",
  lastname: "some",
  email: "example@mail.com",
  password: "111111",
  confirmPassword: "111111",
  phone: "+375291111231",
};

// ========================== form sign in input ==========================
export const FormSignInInpus = {
  email: "test@test.com",
  password: "123123123",
};

// ========================== initial state ==========================
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

// ========================== mock data ==========================
export const mockedData = {
  token: "fake token",
  authFetchingStatus: "loaded",
};
