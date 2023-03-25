import * as yup from "yup";
import { ProductsCategory } from "../app/products/types/products-category.enum";

export const formSchema = yup
    .object({
        category: yup.mixed().oneOf(Object.values(ProductsCategory)).required(),

        name: yup.string().min(1, "⚠ This field is required").required(),

        brand: yup.string().min(1, "⚠ This field is required").required(),

        price: yup.number().min(1, "⚠ This field is required").required(),

        image: yup.string().url().required(),

        quantity: yup
            .number()
            .integer("⚠ This field accepts only integer numbers")
            .min(1, "⚠ This field is required")
            .required(),

        color: yup.string().min(1, "⚠ This field is required").required(),

        material: yup.string().min(1, "⚠ This field is required").required(),

        size: yup.string().min(1, "⚠ This field is required").required(),

        description: yup.string().min(1, "⚠ This field is required").required(),
    })
    .required();
