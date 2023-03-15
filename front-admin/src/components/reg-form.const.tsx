import * as yup from "yup";

export const formSchema = yup
  .object({
    password: yup
      .string()
      .required("⚠ This field is required")
      .min(5, "⚠ Min length is 5"),
    confirmPassword: yup
      .string()
      .required("⚠ This field is required")
      .oneOf([yup.ref("password")], "Passwords do not match"),
  })
  .required();
