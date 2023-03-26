// ========================== react ==========================
import { FC } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// ========================== yup ==========================
import { formSchema } from "./signUp-form.const";
import { yupResolver } from "@hookform/resolvers/yup";

// ========================== mui ==========================
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DoneIcon from "@mui/icons-material/Done";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { IFormInput } from "../app/auth/types/form-input.interface";
import TemporaryTypography from "./temporary-typography.component";

const SignUpForm = ({
  handleSignUp,
  fetchingErrors,
  fetchingPending,
}: {
  handleSignUp: (s: IFormInput) => void;
  fetchingErrors: string | null;
  fetchingPending: boolean;
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    handleSignUp(data);
  };

  return (
    <Paper
      sx={{
        maxWidth: 400,
        minHeight: 400,
        backgroundColor: "lightblue",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Typography variant="h5" fontWeight={"bold"} pb={3}>
        Sign Up
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 5 }}
      >
        <Controller
          name="firstName"
          control={control}
          render={() => (
            <TextField
              id="outlined-basic"
              label="first name"
              variant="outlined"
              {...register("firstName")}
              placeholder="Elvis"
            />
          )}
        />

        <Typography variant="caption" color={"red"}>
          {errors.firstName?.message}
        </Typography>

        <Controller
          name="middleName"
          control={control}
          render={() => (
            <TextField
              id="outlined-basic"
              label="middle name"
              variant="outlined"
              {...register("middleName")}
              placeholder="Aaron"
            />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          render={() => (
            <TextField
              id="outlined-basic"
              label="last name"
              variant="outlined"
              {...register("lastName")}
              placeholder="Presley"
            />
          )}
        />

        <Typography variant="caption" color={"red"}>
          {errors.lastName?.message}
        </Typography>

        <Controller
          name="email"
          control={control}
          render={() => (
            <TextField
              id="outlined-basic"
              label="email"
              variant="outlined"
              {...register("email")}
              placeholder="example@gmail.com"
            />
          )}
        />

        <Typography variant="caption" color={"red"}>
          {errors.email?.message}
        </Typography>

        <Controller
          name="phone"
          control={control}
          render={() => (
            <TextField
              id="outlined-basic"
              label="phone"
              variant="outlined"
              {...register("phone")}
              placeholder="+375 XX XXX XX XX"
            />
          )}
        />

        <Typography variant="caption" color={"red"}>
          {errors.phone?.message}
        </Typography>

        <Controller
          name="password"
          control={control}
          render={() => (
            <TextField
              id="outlined-basic"
              label="password"
              variant="outlined"
              {...register("password")}
              placeholder="password"
            />
          )}
        />

        <Typography variant="caption" color={"red"}>
          {errors.password?.message}
        </Typography>

        <Controller
          name="confirmPassword"
          control={control}
          render={() => (
            <TextField
              id="outlined-basic"
              label="confirm password"
              variant="outlined"
              {...register("confirmPassword")}
              placeholder="password"
            />
          )}
        />

        <Typography variant="caption" color={"red"}>
          {errors.confirmPassword?.message}
        </Typography>

        {/* <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
          }}
        >
          {fetchingErrors && (
            <TemporaryTypography
              variant="overline"
              align="center"
              color="error"
              duration={30}
            >
              {fetchingErrors}
            </TemporaryTypography>
          )}
          <Button type="submit" disabled={!isValid} variant="contained">
            Sign Up
          </Button>
        </Box> */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
          }}
        >
          {fetchingPending && <CircularProgress />}
          {fetchingPending && !fetchingErrors && (
            <TemporaryTypography
              variant="overline"
              align="center"
              color="success.main"
              duration={2}
            >
              <DoneIcon />
            </TemporaryTypography>
          )}

          {fetchingErrors && (
            <TemporaryTypography
              variant="overline"
              align="center"
              color="error"
              duration={30}
            >
              {fetchingErrors}
            </TemporaryTypography>
          )}

          <Button type="submit" disabled={!isValid} variant="contained">
            Sign Up
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default SignUpForm;
