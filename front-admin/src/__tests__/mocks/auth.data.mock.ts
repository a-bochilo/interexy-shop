test.skip("skip", () => {});

// ========================== mock auth with translation ==========================
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

// ========================== mock registration data ==========================
export const mockRegisterData = {
  firstname: "some",
  middlename: "some",
  lastname: "some",
  email: "example@mail.com",
  password: "111111",
  confirmPassword: "111111",
  phone: "+375291111231",
};

// ========================== mock form sign in input ==========================
export const FormSignInInput = {
  email: "test@test.com",
  password: "123123123",
};

// ========================== mock initial state ==========================
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

// ========================== mock responce ==========================
export const mockResponse = {
  meta: {
    arg: {
      email: "superadmin@gmail.com",
      password: "$2b$05$9TFe4fXQEaoYJNpdniw.O.IIByJncLurM20TWrGquevJlaGzweTy.",
    },
    requestId: "16tKACsmUGE_6V02XpcuU",
    requestStatus: "fulfilled",
  },
  payload:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNlYTlmZTFlLWY0OGEtNGE0Yy1iYWVhLWIxMTA0MWMzNWQ4NyIsImVtYWlsIjoic3VwZXJhZG1pbkBnbWFpbC5jb20iLCJwaG9uZSI6IiszNzUgMjkgMDAwIDAwIDAwIiwiY3JlYXRlZCI6MTY3OTY1MTMyNzcxOSwidXBkYXRlZCI6MTY3OTY1MTMyNzcxOSwicm9sZV9pZCI6MSwicm9sZV90eXBlIjoic3VwZXJhZG1pbiIsImlzQWN0aXZlIjp0cnVlLCJpYXQiOjE2ODAyNzQyODIsImV4cCI6MTY4MDI3Nzg4Mn0.SZ8VCutUg2K--FtY0At5BT4Y9cuYo6uvr8fA9OO3SrU",
  type: "auth/fetchSignIn/fulfilled",
};
