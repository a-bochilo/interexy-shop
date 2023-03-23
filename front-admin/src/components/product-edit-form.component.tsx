// =========================== Form ===========================
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// =========================== YUP ===========================
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./product-edit-form.const";

// =========================== MUI ===========================
import {
    Box,
    CircularProgress,
    Paper,
    Typography,
    TextField,
    Button,
    MenuItem,
} from "@mui/material";

// =========================== DTO's & Enums ===========================
import { ProductWithDetailsDto } from "../app/products/types/product-with-details.dto";
import { ProductsCategory } from "../app/products/types/products-category.enum";

type ProductKeysType = keyof ProductWithDetailsDto;

const ProductEditForm = ({
    product,
    isEditable,
    pending,
    setIsEditable,
    handleDelete,
    handleSave,
    handleBack,
}: {
    product: ProductWithDetailsDto;
    isEditable: boolean;
    pending: {
        products: boolean;
        productDetails: boolean;
    };
    setIsEditable: (s: boolean) => void;
    handleDelete: (s: string) => void;
    handleSave: (s: Partial<ProductWithDetailsDto>) => void;
    handleBack: () => void;
}) => {
    const productFullDataEntries: [ProductKeysType, any][] = [
        ...Object.entries(product),
    ] as [ProductKeysType, any][];

    const removeEmptyFields = (
        obj: Partial<ProductWithDetailsDto>
    ): Partial<ProductWithDetailsDto> => {
        const newObj = Object.fromEntries(
            Object.entries(obj).filter(([_, v]) => v !== (null || undefined))
        );
        return newObj as Partial<ProductWithDetailsDto>;
    };

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<ProductWithDetailsDto>({
        mode: "onChange",
        resolver: yupResolver(formSchema),
    });

    const onSubmit: SubmitHandler<Partial<ProductWithDetailsDto>> = (data) => {
        const outputData = Object.assign(removeEmptyFields(data), {
            id: product.id,
        });
        console.log("submit");
        handleSave(outputData);
        setIsEditable(!isEditable);
    };

    const renderTextField = (key: keyof ProductWithDetailsDto, value: any) => (
        <TextField
            sx={{
                width: "100%",
                alignSelf: "right",
            }}
            id={key}
            defaultValue={value}
            variant="standard"
            size="small"
            disabled={
                !isEditable ||
                key === "id" ||
                key === "created" ||
                key === "updated"
            }
            {...register(key)}
        />
    );

    const renderSelect = (
        key: keyof ProductWithDetailsDto,
        value: ProductsCategory
    ) => (
        <TextField
            sx={{
                width: "100%",
                alignSelf: "right",
            }}
            id={key}
            select
            defaultValue={value}
            variant="standard"
            disabled={!isEditable}
        >
            {Object.values(ProductsCategory).map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
    );

    return (
        <Paper
            sx={{
                width: "90%",
                maxWidth: 800,
                backgroundColor: "primary.light",
                justifyContent: "center",
                p: 3,
            }}
        >
            <Typography variant="h6" fontWeight={"bold"} pb={1}>
                Product info
            </Typography>

            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                }}
            >
                {productFullDataEntries.map(([key, value]) => {
                    if (key === "created" || key === "updated") {
                        value = new Date(value).toLocaleString();
                    }
                    return (
                        <Box
                            key={key}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                variant="overline"
                                align="left"
                                sx={{ minWidth: 90, width: 120 }}
                            >
                                {key}
                            </Typography>
                            <Controller
                                name={key}
                                control={control}
                                render={
                                    key !== "category"
                                        ? () => renderTextField(key, value)
                                        : () => renderSelect(key, value)
                                }
                            />

                            <Typography variant="caption" color={"red"}>
                                {errors[key]?.message}
                            </Typography>
                        </Box>
                    );
                })}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "50%",
                        }}
                    >
                        {pending.products && <CircularProgress />}
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexFlow: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "50%",
                            gap: 2,
                        }}
                    >
                        <Button
                            sx={{
                                width: "100%",
                                display: isEditable ? "none" : null,
                            }}
                            variant="contained"
                            color="success"
                            disabled={isEditable}
                            onClick={() => {
                                setIsEditable(!isEditable);
                            }}
                        >
                            Edit
                        </Button>

                        <Button
                            sx={{
                                width: "100%",
                                display: !isEditable ? "none" : null,
                            }}
                            type="submit"
                            variant="contained"
                            color="success"
                            disabled={!isEditable || !isValid}
                        >
                            Save
                        </Button>

                        <Button
                            sx={{
                                width: "100%",
                            }}
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(product.id)}
                        >
                            Delete
                        </Button>

                        <Button
                            sx={{
                                width: "100%",
                            }}
                            variant="contained"
                            color="primary"
                            onClick={handleBack}
                        >
                            Back to products
                        </Button>
                    </Box>
                </Box>
            </form>
        </Paper>
    );
};

export default ProductEditForm;
