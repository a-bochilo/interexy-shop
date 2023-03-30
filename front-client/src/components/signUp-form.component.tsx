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
  handleSignUp: (s: IFormInput) => void;
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

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => handleSignUp(data);

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
        {authWithTranslate?.signUp}
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
              aria-label="First Name"
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
              aria-label="Middle Name"
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
              aria-label="Last Name"
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
              aria-label="Email"
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
              aria-label="Phone"
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
              aria-label="Password"
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
              aria-label="Confirm password"
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
          {fetchingPending !== undefined && (
            <CircularProgress data-testid="pending-stub" />
          )}

          {fetchingPending !== undefined && fetchingErrors !== undefined && (
            <TemporaryTypography
              variant="overline"
              align="center"
              color="success.main"
              duration={2}
              data-testid="done-stub"
            >
              <DoneIcon />
            </TemporaryTypography>
          )}

          {fetchingErrors !== undefined && (
            <TemporaryTypography
              variant="overline"
              align="center"
              color="error"
              duration={30}
              data-testid="error-stub"
            >
              {fetchingErrors}
            </TemporaryTypography>
          )}

          <Button
            type="submit"
            disabled={!isValid}
            variant="contained"
            data-testid="signUp-stub"
          >
            {authWithTranslate.signUp}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default SignUpForm;
