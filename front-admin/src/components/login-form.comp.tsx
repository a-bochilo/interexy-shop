// ========================== react ==========================
import { useForm, SubmitHandler, Controller } from "react-hook-form";

// ========================== yup ==========================
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./login-form.const";

// ========================== mui ==========================
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Paper, Typography } from "@mui/material";

interface IFormInput {
  email: string;
  password: string;
}

const LoginForm = ({
  handleSave,
  error,
}: {
  handleSave: (s: IFormInput) => void;
  error: boolean;
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    defaultValues: {
      email: "superadmin@gmail.com",
      password: "123123123",
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

        <Button
          type="submit"
          disabled={!isValid}
          variant="contained"
          data-testid="loginButton"
        >
          Login
        </Button>

        {error === true ? (
          <Box
            sx={{
              display: "flex",
              border: "2px solid red",
              padding: "5px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="caption" color={"red"}>
              ERROR: FAILED TO SIGNIN
            </Typography>
          </Box>
        ) : null}
      </form>
    </Paper>
  );
};

export default LoginForm;
