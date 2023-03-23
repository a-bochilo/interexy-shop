import * as yup from "yup";

export const formSchema = yup
    .object({
        category: yup.string().min(1, "⚠ This field is required").nullable(),

        name: yup.string().min(1, "⚠ This field is required").nullable(),

        brand: yup.string().min(1, "⚠ This field is required").nullable(),

        price: yup
            .number()
            .integer("⚠ This field accepts only integer numbers")
            .min(1, "⚠ This field is required")
            .nullable(),
        image: yup.string().url(),

        quantity: yup
            .number()
            .integer("⚠ This field accepts only integer numbers")
            .min(1, "⚠ This field is required")
            .nullable(),
        isActive: yup.boolean().nullable(),

        color: yup.string().min(1, "⚠ This field is required").nullable(),

        material: yup.string().min(1, "⚠ This field is required").nullable(),

        size: yup.string().min(1, "⚠ This field is required").nullable(),

        description: yup.string().min(1, "⚠ This field is required").nullable(),
    })
    .required();
