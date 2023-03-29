// ========================== react ==========================
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// ========================== yup ==========================
import { formSchema } from "./signUp-form.const";
import { yupResolver } from "@hookform/resolvers/yup";

// ========================== mui ==========================
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DoneIcon from "@mui/icons-material/Done";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { IFormInput } from "../app/auth/types/form-input.interface";
import TemporaryTypography from "./temporary-typography.component";
import { IAuthTranslate } from "../app/auth/types/auth-translate.interface";
import { ISignUpTemplate } from "../app/auth/types/signUp.interface";

const SignUpForm = ({
  handleSignUp,
  fetchingErrors,
  fetchingPending,
  authWithTranslate,
}: {
  handleSignUp: (s: ISignUpTemplate) => void;
  fetchingErrors: string | null;
  fetchingPending: boolean;
  authWithTranslate: IAuthTranslate;
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    
    const user: ISignUpTemplate = {
      email: data.email,
      password: data.password,
      phone: data?.phone,
      details: {
        firstname: data?.firstName || "",
        middlename: data?.middleName,
        lastname: data?.lastName || "",
      },
    };
    return handleSignUp(user);
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
        {authWithTranslate.signUp}
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
              id="outlined-firstName"
              label={authWithTranslate.firstName}
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
              label={authWithTranslate.middleName}
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
              label={authWithTranslate.lastName}
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
              label={authWithTranslate.email}
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
              label={authWithTranslate.phone}
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
              label={authWithTranslate.password}
              variant="outlined"
              {...register("password")}
              placeholder="password"
              type="password"
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
              label={authWithTranslate.confirmPassword}
              variant="outlined"
              {...register("confirmPassword")}
              placeholder="confirmpass"
              //type="password"
            />
          )}
        />

        <Typography variant="caption" color={"red"}>
          {errors.confirmPassword?.message}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {fetchingPending && <CircularProgress />}
          {fetchingPending && fetchingErrors && (
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
            {authWithTranslate.signUp}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default SignUpForm;
