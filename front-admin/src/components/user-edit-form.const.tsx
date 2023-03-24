// ========================== yup ==========================
import * as yup from "yup";

const phoneRegExp = /^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/;

export const formSchema = yup
  .object({
    email: yup
      .string()
      .required("⚠ This field is required")
      .email("⚠ Entered value does not match email format"),
    firstname: yup.string().required("⚠ This field is required"),
    lastname: yup.string().required("⚠ This field is required"),
    phone: yup
      .string()
      .required("⚠ This field is required")
      .matches(phoneRegExp, "⚠ Entered value does not match phone format"),
  })
  .required();
