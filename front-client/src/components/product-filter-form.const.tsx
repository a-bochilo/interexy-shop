import * as yup from "yup";
import { ProductsCategory } from "../app/products/types/products-category.enum";

export const formSchema = yup
  .object({
    category: yup
      .mixed()
      .oneOf([...Object.values(ProductsCategory), "all"])
      .nullable(),

    name: yup.string().nullable(),

    brand: yup.string().nullable(),

    minQuantity: yup
      .number()
      .integer("⚠ This field accepts only integer numbers")
      .min(0, "⚠ Min value is 0")
      .default(undefined)
      .nullable()
      .transform((_, val) => {
        if (val === (null || "")) return null;
        return +val === Number(val) ? +val : null;
      }),

    maxQuantity: yup
      .number()
      .integer("⚠ This field accepts only integer numbers")
      .min(0, "⚠ Min value is 0")
      .default(undefined)
      .nullable()
      .transform((_, val) => {
        if (val === (null || "")) return null;
        return +val === Number(val) ? +val : null;
      }),

    minPrice: yup
      .number()
      .integer("⚠ This field accepts only integer numbers")
      .min(0, "⚠ Min value is 0")
      .default(undefined)
      .nullable(true)
      .transform((_, val) => {
        if (val === (null || "")) return null;
        return +val === Number(val) ? +val : val;
      }),

    maxPrice: yup
      .number()
      .integer("⚠ This field accepts only integer numbers")
      .min(0, "⚠ Min value is 0")
      .default(undefined)
      .nullable()
      .transform((_, val) => {
        if (val === (null || "")) return null;
        return +val === Number(val) ? +val : null;
      }),

    isActive: yup.boolean().nullable(),

    color: yup.string().nullable(),

    material: yup.string().nullable(),

    size: yup.string().nullable(),

    description: yup.string().nullable(),
  })
  .required();
