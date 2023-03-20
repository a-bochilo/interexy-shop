// ========================== yup ==========================
import * as yup from "yup";

export const formSchema = yup
  .object({
    email: yup
      .string()
      .required("⚠ This field is required")
      .email("⚠ Entered value does not match email format"),
    password: yup
      .string()
      .required("⚠ This field is required")
      .min(5, "⚠ Min length is 5"),
  })
  .required();
