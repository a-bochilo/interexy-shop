// =========================== form ===========================
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// =========================== yup ===========================
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./product-add-form.const";

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
import { ProductCreateDto } from "../app/products/types/product-create.dto";

type ProductKeysType = keyof ProductWithDetailsDto;

const ProductAddForm = ({
  pending,
  fetchingErrors,
  isClicked,
  handleSave,
  handleBack,
}: {
  pending: IProductsState["pending"];
  fetchingErrors: IProductsState["errors"];
  isClicked: boolean;
  handleSave: (s: ProductCreateDto) => Promise<boolean>;
  handleBack: () => void;
}) => {
  const fields: ProductKeysType[] = [
    "category",
    "name",
    "brand",
    "price",
    "image",
    "quantity",
    "color",
    "material",
    "size",
    "description",
  ];

  // ===== hook form =====
  const {
    register,
    control,
    handleSubmit,
    // reset,
    formState: { errors, isValid },
  } = useForm<ProductWithDetailsDto>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<ProductCreateDto> = async (data) => {
    const isPositive = await handleSave(data);

    if (isPositive) {
      // could be used in case it neccessary
      // reset();
    }
  };

  // ===== render handlers =====
  const renderTextField = (key: ProductKeysType) => {
    return (
      <TextField
        sx={{
          width: "100%",
          alignSelf: "right",
        }}
        id={key}
        aria-label={key}
        defaultValue=""
        variant="standard"
        size="small"
        {...register(key)}
      />
    );
  };

  const renderSelect = (key: ProductKeysType) => (
    <TextField
      sx={{
        width: "100%",
        alignSelf: "right",
      }}
      id={key}
      select
      aria-label={key}
      defaultValue=""
      variant="standard"
      {...register(key)}
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
        Product add
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
        {fields.map((key: keyof ProductWithDetailsDto) => (
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
                {key}
              </Typography>
              <Controller
                name={key}
                control={control}
                render={
                  key !== "category"
                    ? () => renderTextField(key)
                    : () => renderSelect(key)
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
            {pending.products && (
              <CircularProgress data-testid="pending-stub" />
            )}
            {isClicked && !pending.products && !fetchingErrors.products && (
              <TemporaryTypography
                data-testid="temp-done-icon"
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
              }}
              data-testid="save-btn"
              size="small"
              type="submit"
              variant="contained"
              color="success"
              disabled={!isValid}
            >
              Save
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

export default ProductAddForm;
