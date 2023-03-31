// ========================== react ========================
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// ========================== yup ==========================
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./login-form.const";

// ========================== mui ==========================
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Paper, Typography } from "@mui/material";

// ======================== components ======================
import TemporaryTypography from "./temporary-typography.component";

interface IFormInput {
  email: string;
  password: string;
}

const LoginForm = ({
  handleSave,
  fetchingErrors,
}: {
  handleSave: (s: IFormInput) => void;
  fetchingErrors: string | null;
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    defaultValues: {
      email: "superadmin@gmail.com",
      password: "$2b$05$9TFe4fXQEaoYJNpdniw.O.IIByJncLurM20TWrGquevJlaGzweTy.",
    },
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    handleSave(data);
  };

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
        Login
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
          name="password"
          control={control}
          render={() => (
            <TextField
              id="outlined-basic"
              label="password"
              type="password"
              variant="outlined"
              {...register("password", {
                required: true,
                minLength: {
                  value: 5,
                  message: "min length is 6",
                },
              })}
              placeholder="password"
            />
          )}
        />

        <Typography variant="caption" color={"red"}>
          {errors.password?.message}
        </Typography>

        {fetchingErrors !== null && (
          <TemporaryTypography
            variant="overline"
            align="center"
            color="error"
            duration={10}
            data-testid="error-stub"
          >
            {fetchingErrors}
          </TemporaryTypography>
        )}

        <Button
          type="submit"
          disabled={!isValid}
          variant="contained"
          data-testid="loginButton"
        >
          Login
        </Button>
      </form>
    </Paper>
  );
};

export default LoginForm;
