import * as yup from "yup";
import { ProductsCategory } from "../app/products/types/products-category.enum";

export const formSchema = yup
    .object({
        category: yup.mixed().oneOf(Object.values(ProductsCategory)).nullable(),

        name: yup.string().min(1, "⚠ This field is required").nullable(),

        brand: yup.string().min(1, "⚠ This field is required").nullable(),

        price: yup.number().min(0, "⚠ This field is required").nullable(),

        image: yup.string().url(),

        quantity: yup
            .number()
            .integer("⚠ This field accepts only integer numbers")
            .min(0, "⚠ This field is required")
            .nullable(),

        isActive: yup.boolean().nullable(),

        color: yup.string().min(1, "⚠ This field is required").nullable(),

        material: yup.string().min(1, "⚠ This field is required").nullable(),

        size: yup.string().min(1, "⚠ This field is required").nullable(),

        description: yup.string().min(1, "⚠ This field is required").nullable(),
    })
    .required();
