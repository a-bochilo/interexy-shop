// ========================== yup ==========================
import * as yup from "yup";

const phoneRegExp = /^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/;

export const formSchema = yup
    .object({
        firstName: yup.string().required("⚠ This field is required"),
        lastName: yup.string().required("⚠ This field is required"),
        email: yup
            .string()
            .required("⚠ This field is required")
            .email("⚠ Entered value does not match email format"),
        phone: yup
            .string()
            .required("⚠ This field is required")
            .matches(
                phoneRegExp,
                "⚠ Entered value does not match phone format"
            ),
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
