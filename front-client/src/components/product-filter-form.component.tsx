import { useState } from "react";
import { useNavigate } from "react-router-dom";

// =========================== Form ===========================
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// =========================== YUP ===========================
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./product-filter-form.const";

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
import TemporaryTypography from "./temporary-typography.component";
import DoneIcon from "@mui/icons-material/Done";

// =========================== DTO's & Enums ===========================
import { ProductsCategory } from "../app/products/types/products-category.enum";
import { ProductFilterDto } from "../app/products/types/product-filter.dto";

// =========================== Store ===========================
import { useAppDispatch, useAppSelector } from "../store";
import {
    productsErrorsSelector,
    productsPendingSelector,
} from "../app/products/store/products.selectors";
import { clearErrors } from "../app/products/store/products.slice";
import { filterProduct } from "../app/products/store/products.actions";

type FilterKeysType = keyof ProductFilterDto;

const ProductFilterForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [isClicked, setIsClicked] = useState<boolean>(false);

    const pending = useAppSelector(productsPendingSelector);
    const fetchingErrors = useAppSelector(productsErrorsSelector);

    const handleFilter = async (product: ProductFilterDto) => {
        dispatch(clearErrors());
        const { type } = await dispatch(filterProduct(product));
        setIsClicked(true);
        return !type.endsWith("rejected");
    };

    const removeEmptyFields = (obj: ProductFilterDto): ProductFilterDto => {
        const newObj = Object.fromEntries(
            Object.entries(obj).filter(([_, v]) => {
                if (v === null) return false;
                return v !== (null || undefined || "all");
            })
        );
        return newObj as ProductFilterDto;
    };

    const fields: FilterKeysType[] = [
        "category",
        "name",
        "brand",
        "minPrice",
        "maxPrice",
        "minQuantity",
        "maxQuantity",
        "isActive",
    ];

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<ProductFilterDto>({
        defaultValues: {
            category: null,
            name: null,
            brand: null,
            minPrice: null,
            maxPrice: null,
            quantity: null,
            minQuantity: null,
            maxQuantity: null,
            isActive: null,
        },
        mode: "onSubmit",
        resolver: yupResolver(formSchema),
    });

    const onSubmit: SubmitHandler<ProductFilterDto> = async (data) => {
        const outputData = removeEmptyFields(data);
        console.log(outputData);
        const isPositive = await handleFilter(outputData);

        if (isPositive) navigate("/products");
    };

    const renderController = (
        key: FilterKeysType,
        render: (key: FilterKeysType) => JSX.Element
    ) => (
        <>
            <Controller
                name={key}
                control={control}
                render={() => render(key)}
            />

            <Typography variant="caption" color={"red"}>
                {errors[key]?.message}
            </Typography>
        </>
    );
    const renderTextField = (key: FilterKeysType) => {
        return (
            <TextField
                sx={{
                    width: "100%",
                    alignSelf: "right",
                }}
                label={key
                    .split(/(?=[A-Z])/)
                    .join(" ")
                    .toLowerCase()}
                id={key}
                variant="standard"
                size="small"
                defaultValue={null}
                {...register(key)}
            />
        );
    };

    const renderCategorySelect = (key: FilterKeysType) => {
        return (
            <TextField
                sx={{
                    width: "100%",
                    alignSelf: "right",
                }}
                id={key}
                label="Select category"
                select
                size="small"
                defaultValue="all"
                variant="standard"
                {...register(key)}
            >
                {["all", ...Object.values(ProductsCategory)].map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
        );
    };

    const renderIsActiveSelect = (key: FilterKeysType) => {
        return (
            <TextField
                sx={{
                    width: "100%",
                    alignSelf: "right",
                }}
                id={key}
                label={key
                    .split(/(?=[A-Z])/)
                    .join(" ")
                    .toLowerCase()}
                select
                size="small"
                defaultValue={true as any}
                variant="standard"
                {...register(key)}
            >
                <MenuItem key={"active"} value={true as any}>
                    {"active"}
                </MenuItem>

                <MenuItem key={"inactive"} value={false as any}>
                    {"inactive"}
                </MenuItem>
            </TextField>
        );
    };

    return (
        <Paper
            sx={{
                width: "100%",
                maxWidth: 800,
                backgroundColor: "primary.light",
                justifyContent: "center",
                p: 2,
            }}
        >
            <Typography
                fontWeight={"bold"}
                align={"center"}
                color="primary"
                pb={1}
            >
                Filter products
            </Typography>

            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                }}
            >
                {renderController("category", renderCategorySelect)}

                {renderController("name", renderTextField)}

                {renderController("brand", renderTextField)}

                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                    }}
                >
                    {renderController("minPrice", renderTextField)}
                    {renderController("maxPrice", renderTextField)}
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                    }}
                >
                    {renderController("minQuantity", renderTextField)}
                    {renderController("maxQuantity", renderTextField)}
                </Box>

                {renderController("isActive", renderIsActiveSelect)}

                <Box
                    sx={{
                        display: "flex",
                        flexFlow: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        gap: 2,
                    }}
                >
                    <Button
                        sx={{
                            width: "100%",
                        }}
                        size="small"
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!isValid}
                    >
                        Filter
                    </Button>

                    <Button
                        sx={{
                            width: "100%",
                        }}
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => reset()}
                    >
                        Reset
                    </Button>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    {pending.products && <CircularProgress />}
                    {isClicked &&
                        !pending.products &&
                        !fetchingErrors.products && (
                            <TemporaryTypography
                                variant="overline"
                                align="center"
                                color="success.main"
                                duration={2}
                            >
                                <DoneIcon />
                            </TemporaryTypography>
                        )}

                    {fetchingErrors.products && (
                        <TemporaryTypography
                            variant="overline"
                            align="center"
                            color="error"
                            duration={30}
                        >
                            {fetchingErrors.products}
                        </TemporaryTypography>
                    )}
                </Box>
            </form>
        </Paper>
    );
};

export default ProductFilterForm;
