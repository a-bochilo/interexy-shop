// =========================== form ===========================
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// =========================== yup ===========================
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./product-edit-form.const";

// =========================== mui ===========================
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

// =========================== dto's & enums ===========================
import { ProductWithDetailsDto } from "../app/products/types/product-with-details.dto";
import { ProductsCategory } from "../app/products/types/products-category.enum";
import { IProductsState } from "../app/products/types/products-state.interface";

type ProductKeysType = keyof ProductWithDetailsDto;

const ProductEditForm = ({
  product,
  isEditable,
  pending,
  fetchingErrors,
  isClicked,
  setIsEditable,
  handleDelete,
  handleSave,
  handleBack,
}: {
  product: ProductWithDetailsDto;
  isEditable: boolean;
  pending: IProductsState["pending"];
  fetchingErrors: IProductsState["errors"];
  isClicked: boolean;
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

  // ===== hook form =====
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
    handleSave(outputData);
    setIsEditable(!isEditable);
  };

  // ===== render handlers =====
  const renderTextField = (key: ProductKeysType, value: any) => {
    if (key === "created" || key === "updated") {
      value = new Date(value).toLocaleString();
    }
    return (
      <TextField
        sx={{
          width: "100%",
          alignSelf: "right",
        }}
        id={key}
        data-testid={`test-${key}`}
        defaultValue={value}
        variant="standard"
        size="small"
        aria-label={key}
        disabled={
          !isEditable || key === "id" || key === "created" || key === "updated"
        }
        {...register(key)}
      />
    );
  };

  const renderCategorySelect = (
    key: ProductKeysType,
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
      {...register(key)}
    >
      {Object.values(ProductsCategory).map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );

  const renderIsActiveSelect = (key: ProductKeysType, value: any) => {
    return (
      <TextField
        sx={{
          width: "100%",
          alignSelf: "right",
        }}
        id={key}
        select
        size="small"
        defaultValue={value}
        variant="standard"
        disabled={!isEditable}
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
        {/* fields */}
        {productFullDataEntries.map(([key, value]) => (
          <Box key={key}>
            <Box
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
                {key.split(/(?=[A-Z])/).join(" ")}
              </Typography>
              <Controller
                name={key}
                control={control}
                render={
                  key === "category"
                    ? () => renderCategorySelect(key, value)
                    : key === "isActive"
                    ? () => renderIsActiveSelect(key, value)
                    : () => renderTextField(key, value)
                }
              />
            </Box>

            <Typography variant="caption" color={"red"}>
              {errors[key]?.message}
            </Typography>
          </Box>
        ))}

        {/* toolbar */}
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
            {isClicked && !pending.products && !fetchingErrors.products && (
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
              size="small"
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
              size="small"
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
              size="small"
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
              size="small"
              variant="contained"
              color="primary"
              onClick={handleBack}
            >
              Back to all
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export default ProductEditForm;
