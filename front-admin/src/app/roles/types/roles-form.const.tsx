// ========================== yup ==========================
import * as yup from "yup";

export const formSchema = yup
  .object({
    id: yup.number().required("⚠ This field is required"),
    name: yup
      .string()
      .required("⚠ This field is required")
      .min(4, "⚠ Min length is 4"),
    type: yup.string().required("⚠ This field is required"),
    permissions: yup.array()
  })
  .required();
