// ========================== react ==========================
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// ========================== yup ==========================
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./signIn-form.const";

// ========================== mui ==========================
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Paper, Typography } from "@mui/material";
import { IAuthTranslate } from "../app/auth/types/auth-translate.interface";
import TemporaryTypography from "./temporary-typography.component";

interface IFormInput {
  email: string;
  password: string;
}

const SignInForm = ({
  handleSignIn,
  handleRedirectToSignUp,
  authWithTranslate,
  fecthErrors,
}: {
  handleRedirectToSignUp: () => void;
  handleSignIn: (s: IFormInput) => void;
  authWithTranslate: IAuthTranslate;
  fecthErrors: string | null;
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

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => handleSignIn(data);

  return (
    <Paper
      sx={{
        maxWidth: 400,
        minHeight: 340,
        backgroundColor: "lightblue",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Typography variant="h5" fontWeight={"bold"} pb={3}>
        {authWithTranslate.login}
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 20 }}
      >
        <Controller
          name="email"
          control={control}
          render={() => (
            <TextField
              inputProps={{ "data-testid": "email-stub" }}
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
          name="password"
          control={control}
          render={() => (
            <TextField
              inputProps={{ "data-testid": "password-stub" }}
              id="outlined-basic"
              label={authWithTranslate.password}
              type="password"
              variant="outlined"
              {...register("password", {
                required: true,
                minLength: {
                  value: 5,
                  message: "min length is 5",
                },
              })}
              placeholder="password"
            />
          )}
        />

        <Typography variant="caption" color={"red"}>
          {errors.password?.message}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "100%",
            }}
          >
            {fecthErrors !== undefined && (
              <TemporaryTypography
                variant="overline"
                align="center"
                color="error"
                duration={10}
                data-testid="error-stub"
              >
                {fecthErrors}
              </TemporaryTypography>
            )}
            <Button
              type="submit"
              disabled={!isValid}
              variant="contained"
              data-testid="signin-button"
            >
              {authWithTranslate.signIn}
            </Button>
            <Button
              variant="contained"
              onClick={handleRedirectToSignUp}
              data-testid="signup-button"
            >
              {authWithTranslate.signUp}
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export default SignInForm;
